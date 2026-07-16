---
categories:
- dev
date: 2026-07-15
description: How I used Claude Fable 5 to drive the Oh My Posh issue tracker and PR queue to zero in one week, and the orchestration workflow that grew out of it.
tags:
- oh-my-posh
- claude
- fable
- ai
- agents
- workflow
- automation
- open-source
- maintainer
title: "Zero Open Issues: A Week with Claude Fable 5"
url: /zero-open-issues-a-week-with-claude-fable-5
---

Yesterday morning, [Oh My Posh](https://ohmyposh.dev) had **zero open issues and zero open pull requests**. For a project with a backlog reaching back to April 2024, maintained by someone preoccupied with building a "new" career, that seemed impossible. It took one week, 43 Claude Code sessions, and a new model that changed how I work with AI: Claude Fable 5.

One caveat before the numbers impress anyone: none of this happened during office hours. My days belong to other engagements, so I reviewed before work, over lunch, and in the evening. The steering in between came down to single messages, seconds of attention rather than blocks of focus.

Before we jump into the interesting details, there's a story about how I ended up here. GitHub announced their new Usage Based Billing, which came into effect last June. That change brought a significant shift in my Copilot usage: it basically nerfed it. Not even halfway through July, the credits in my Copilot Max plan were depleted, partly because I was playing with Fable (limited there), and partly because I was experimenting with multi-agent workflows to solve my backlog challenges with quality. So I moved to Claude Code, using my Max subscription there.

On to the fun part. Between July 8 and July 15, we closed **31 issues and 45 pull requests**, of which 41 merged.

Real features shipped, and quite a few bugs got squashed:

- template expressions in segment options ([#7243](https://github.com/JanDeDobbeleer/oh-my-posh/issues/7243))
- Go templates in palette colors ([#7572](https://github.com/JanDeDobbeleer/oh-my-posh/issues/7572))
- a right-aligned template for the transient prompt ([#4822](https://github.com/JanDeDobbeleer/oh-my-posh/issues/4822))
- Yash shell support ([#7121](https://github.com/JanDeDobbeleer/oh-my-posh/issues/7121))
- a fallback template for disabled segments ([#7581](https://github.com/JanDeDobbeleer/oh-my-posh/issues/7581))
- on-demand prompt repaint for zsh and pwsh ([#7427](https://github.com/JanDeDobbeleer/oh-my-posh/issues/7427))
- chained `extends` for config files ([#7531](https://github.com/JanDeDobbeleer/oh-my-posh/issues/7531))

Here's the whole week, replayed from the actual Claude Code transcripts and GitHub events. Every cell is a real session, every line in the feed a real issue or PR closing:

{{< fable-week >}}

Yes, I took inspiration from the [rewriting Bun in Rust](https://bun.com/blog/bun-in-rust) blog post. And I realize this isn't nearly as impressive, but I like the visual OK :-)

## Fable is not just another iteration

I've used Claude models daily for a while now. Every release was better at writing code than the last, and each still needed me to do the same job: figure out what's actually wrong, decide what a good solution looks like, and check the result. Each iteration shrank my input, yet I was still heavily steering the conversation and outcomes.

Fable 5 moved the line. It writes better Go, sure, but the real difference is **judgment**. Point it at an issue and it comes back with an analysis I'd sign: what the reporter actually means (not what they wrote), whether the problem is ours or the shell's, which solution is pragmatic and which paints us into a corner. That's maintainer work. That was *my* work. Do I still review everything? Yes, but my involvement changed from 10+ steering comments to one or two questions and a GO!

The moment this clicked was Tuesday. I pointed a session at the issue list and asked, in one sentence, which open issues were feasible to solve. Claude walked the issues and spawned **six Fable 5 agents in parallel**, one per issue, each producing a feasibility analysis with a concrete plan. One follow-up message set the delivery pattern, and the task notifications rolled in: analyses finished, Sonnet 5 implementation agents picked up the approved plans, tests ran, PRs appeared. Four issues from 2024–2026 plus two latent bugs the analysis had uncovered, *kicked off over lunch and resolved by the time I checked back in the afternoon*, steered with a few sentences.

## How the workflow evolved

I didn't start the week with that setup. It grew, and the evolution is the actual story.

**Days 1–2: Fable does everything.** When Fable landed I used it like I'd used every model before: one big session, the model reads, edits, tests, and I ride shotgun. It worked, brilliantly even. The early mornings and evenings of Wednesday and Thursday went deep into the ugliest issues, the kind where the bug lives between oh-my-posh, the shell, and the terminal emulator: a zsh coprocess notification leaking into JetBrains terminals, PowerShell hanging on exit because a daemon kept the pipe open. Fable debugged these across three shells, reasoning about PTY behavior and process lifetimes, and never lost the thread. But those two days also demanded the most from me. Of the week's 181 messages, 79 landed there: I pasted error output and confirmed behavior on my machine, because for interactive shell bugs *I* was the test environment.

**Days 3–5: Fable plans, Sonnet builds.** Cost and speed push you toward an obvious question: does the most capable model need to write every line? **No.** The pattern that settled in: Fable analyzes the issue and writes the plan, then delegates implementation to Sonnet 5 subagents, in parallel when tasks are independent, and reviews the result as the orchestrator. Haiku handles the grunt work, like fanning out over GitHub to search for related upstream issues. My role shrank to picking the approach and validating the result.

**Day 6: the inversion.** Monday I flipped it. For routine work (a PR review, a small well-understood fix) Sonnet 5 drove the main session directly; no Fable needed. And in that Tuesday triage session, Sonnet was the orchestrator while **Fable ran as the subagent**, spawned six times in parallel purely for analysis. That's when the mental model snapped into place: Fable is **the architect you dispatch** wherever judgment is needed. The expensive model does the thinking, the fast models do the plumbing, and both are one prompt away.

**Days 7–8: the final push.** With the pattern established, the last stubborn issues fell fast. Fable orchestrating, Sonnet implementing, me spot-checking.

Now, you could argue this is common knowledge. But in my experience, Sonnet 5 still choked on the more challenging implementations. Oh My Posh is anything but standard software: the model needs a lot of context to connect the dots, and the shell-to-executable integration carries so many quirks and gotchas that *only Fable* understands and resolves them fast. Building a quality workflow that lowers my involvement took real experimentation, well off the beaten path.

## Write it down: a skill and a memory

The pattern didn't stay in my head. It became `code-changes`, a skill that now gates every task ending in code. It defines six phases in order: analyze, plan, delegate, supervise, verify, deliver. It assigns roles by capability: the strongest reasoning model orchestrates, mid-tier models implement, and delegation always targets the cheapest model that can do the job. Two rules do the heavy lifting. Analysis is validated against the code, never against the issue text alone. And a **stop gate** ends the analysis phase: the agent reports its findings and proposed approach, then waits for my go before writing a line. Delivery means conventional commits and an outcome-first report, every time.

The other half is memory. Agents keep a persistent, project-scoped notebook for oh-my-posh, and they wrote in it all week: thirteen entries so far. The brutal debugging days produced reusable WSL test harnesses for the zsh and fish streaming bugs, the root cause of the PowerShell exit deadlock, and a latency breakdown of the pwsh prompt. My preferences landed there too: fixup commits into the PR commit that introduced the problem, the writing skill applied to every piece of human-facing prose. That's why the week *compounds*. A Monday session starts with everything Thursday learned, instead of rediscovering it at my expense.

## The numbers

I parsed all 43 session transcripts to measure this rather than guess, deduplicating the history that resumed sessions carry so nothing counts twice.

{{< fable-week-stats >}}

Agents put in roughly **fourteen hours** of measured, active work. I sent about **5,200 words** across eight days, the length of one long blog post. Median message: 105 characters, dropped in as single asides before work, over lunch, or in the evening. And I didn't even type them: I talk to my agents with [Wispr Flow](https://wisprflow.ai/r?JAN12455), which turns steering a session into a spoken aside and speeds things up significantly. It felt like running code review for a very fast team. Twenty-four of the 43 sessions needed **three or fewer messages** from me, start to finish.

My time went where it should: judgment calls, quality gates, and the hands-on work agents can't do, like validating prompt rendering in a real terminal and pushing the final commits. The fourteen interrupts matter too: supervision stayed in the loop the whole week. Every merged PR still went through CI, tests, and my eyes.

## What made it work

Three things, and only one of them is the model.

**Fable's analysis is trustworthy enough to delegate against.** This is what changed. Previous models produced plans I had to re-derive to trust, which meant delegation saved typing, not thinking. Fable's analysis was consistently the one I would have done, sometimes better, because it actually read all 40 comments on that issue from 2024. When the plan is trustworthy, everything downstream can be cheaper and parallel.

**The workflow lives outside the conversation.** The `code-changes` skill carries the process and the project memory carries the context, so a one-line instruction is complete. Nothing needs repeating per session, and nothing hard-won gets lost between them.

**Match the model to the job.** Fable where judgment matters: triage, architecture, gnarly debugging, final review. Sonnet 5 for well-specified implementation, and as the daily driver for routine sessions. Haiku for search and lookups. By the end of the week this was reflexive, and it's the difference between a workflow that's impressive and one that's sustainable.

## Wrapping up

A year ago, "zero open issues" on a 23k-star project was something I'd joke about. Most of that backlog simply needed an hour of focused analysis per issue, an hour I never had. That's exactly the work Fable 5 absorbs.

**The bottleneck moved**, and that matters far more than the Go a model wrote. For years the constraint on Oh My Posh was my attention, and now the constraint is how well I can define what good looks like, encode it in skills, and review what comes back. That's a much better constraint to have.

Fable is the first model I've dispatched instead of driven, six copies at a time, and trusted the answers enough to build a week around them. The tracker reads zero. I spoke 5,200 words. *It depends* on your backlog, of course, but mine is gone.
