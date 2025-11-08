---
categories:
- dev
date: 2025-11-08
description: How I use git worktrees to run AI agents in parallel while maintaining my chaotic developer workflow.
tags:
- git
- worktrees
- ai
- agents
- copilot
- workflow
- automation
- parallel
- nushell
- powershell
title: "Parallel Workflows with Git Worktrees and AI Agents"
url: /parallel-workflows-git-worktrees-agents
---

This workflow isn't new. For the past decade, I've been using git worktrees to allow myself to work in parallel when needed. Whether it's fixing a quick bug while leaving my chaotic thoughts in their current state, or juggling multiple features without the mental overhead of stashing and context switching. It's been a game changer for maintaining focus and sanity.

What's new is that **I've moved this workflow to having agents do the work for me instead**. I use Copilot CLI to have conversations right from the command line, but I still have the freedom to open an IDE and write or adjust code myself when needed. The agents work in their own worktrees, and I orchestrate everything from my terminal. It's the same parallel workflow, just supercharged.

## What are Git Worktrees?

If you're not familiar with git worktrees, let me break it down. Imagine you're working on a feature branch, but suddenly you need to fix a critical bug in production. The traditional approach would be to either:

1. Stash your changes, switch branches, fix the bug, commit, then switch back and unstash
2. Commit your half-done work with a "WIP" message (we've all done it)
3. Clone the repository again somewhere else

All of these options are suboptimal. **Worktrees solve this elegantly.**

A git worktree allows you to check out multiple branches of the same repository simultaneously, each in its own directory. They all share the same Git history (stored in `.git`), but each worktree has its own working directory with its own checked-out branch.

Think of it like this: instead of constantly switching what's in your current folder, you have multiple folders, each representing a different branch, all connected to the same underlying repository. No more stashing, no more WIP commits, no more mental overhead.

### Core git worktree commands

```bash
git worktree add <path> -b <branch>
```

Creates a new working directory at `<path>` and (with -b) also creates and checks out a new branch in one step. If you omit -b and the branch exists, it just checks it out. Path can be relative (e.g. `../repo-feature-login`). You cannot add a worktree for a branch already checked out elsewhere.

```bash
git worktree list
```

Shows all active worktrees: their paths, the `HEAD` commit, and the branch checked out. Use this to orient yourself and decide what to clean up.

```bash
git worktree remove <path>
```

Removes the working directory for that worktree. Use --force if there are uncommitted changes you intentionally want to discard. Removing the worktree does NOT delete the branch; that is a separate `git branch -D <branch>` step if you want it gone.

```bash
git worktree prune
```

Cleans up internal administrative data for worktrees that were deleted manually (e.g. you deleted the folder without using `git worktree remove`). Run occasionally to keep metadata tidy.

**Practical flow:** add a disposable worktree (often with a descriptive branch name), do isolated work or let an agent run, then remove the worktree and optionally delete the branch when finished. This keeps your main workspace clean and history intentional.

Here's the beauty of it:

- **Each worktree is isolated** - changes in one don't affect the others
- **They share the same Git database** - so they're lightweight and fast
- **You can't check out the same branch twice** - Git prevents conflicts automatically
- **Perfect for parallel work** - whether it's you or an AI agent doing the work

## Why this works perfectly for AI Agents

When you're working with AI agents like Copilot CLI, they need their own space to work. They might be editing files, running tests, or making experimental changes. You don't want that interfering with your current work, but you also don't want to wait for them to finish before you can do something else.

With worktrees, I can spin up a new worktree for an agent, point it to that directory, and let it work in parallel while I continue what I'm doing. The agent gets a clean branch to work on, and I can review its changes when it's done without any context switching on my end.

If the agent messes something up? No problem, that worktree is isolated. Delete it, create a new one, try again. My main work remains untouched.

## My Workflow

Here's how I typically work with this setup:

1. **Main worktree** - This is where I do my primary work, review PRs, or just browse code
2. **Agent worktrees** - I create these on-demand when I want an agent to tackle a specific task
3. **Quick-fix worktrees** - When I need to make a quick change or test something, I spin up a temporary worktree for myself

The key is that everything stays organized. Each worktree has a clear purpose, and I can see at a glance what's happening where. If I want to, I can open my IDE and take over. The files and changes are right there.

## The Helper Functions

> ⚠️ These helper functions are Windows-specific and use Windows Terminal (`wt.exe`) to open a new tab and start Copilot CLI. On macOS/Linux, adapt the terminal invocation and path conventions accordingly.

To make this workflow smooth, I've created some helper functions in both Nushell and PowerShell. I'll add these later, but they basically handle:

- **Creating agent worktrees** - Create a branch, worktree and Copilot CLI session in one command
- **Cleaning up worktrees** - Remove a worktree and its branch when done

These helpers remove the friction of remembering git commands and let me focus on the actual work. The goal is to make spinning up and tearing down parallel workspaces as effortless as possible.

### High level overview

- You choose a base folder where these temporary agent workspaces live.
- The “open” helper creates an isolated workspace on a new branch and opens a new terminal tab inside it, immediately starting Copilot CLI so the agent can begin working right away.
- The “remove” helper cleans up that workspace and its branch when you're done, keeping things disposable and tidy.
- Using a repo-branch naming style makes it obvious what each workspace is for and safe to delete later.
- The Nushell and PowerShell variants behave the same; only the shell syntax differs.

{{% tabs %}}
{{% tab "PowerShell" %}}
```powershell
$env:AGENTS_WORKTREES_PATH="D:/worktrees"

function Open-Worktree {
    param(
        [Parameter(Mandatory=$true)]
        [string]$BranchName
    )

    if (-not $env:AGENTS_WORKTREES_PATH) {
        Write-Host "Error: AGENTS_WORKTREES_PATH environment variable is not set" -ForegroundColor Red
        return
    }

    $worktreesBase = $env:AGENTS_WORKTREES_PATH
    $repoName = Split-Path -Leaf (git rev-parse --show-toplevel)
    $worktreePath = Join-Path $worktreesBase "$repoName-$BranchName"

    git worktree add $worktreePath -b $BranchName

    if ($LASTEXITCODE -eq 0) {
        wt.exe -w 0 nt -d $worktreePath nu -c "copilot"
    }
}

function Remove-Worktree {
    param(
        [Parameter(Mandatory=$true)]
        [string]$BranchName
    )

    if (-not $env:AGENTS_WORKTREES_PATH) {
        Write-Host "Error: AGENTS_WORKTREES_PATH environment variable is not set" -ForegroundColor Red
        return
    }

    $worktreesBase = $env:AGENTS_WORKTREES_PATH
    $repoName = Split-Path -Leaf (git rev-parse --show-toplevel)
    $worktreePath = Join-Path $worktreesBase "$repoName-$BranchName"

    if (-not (Test-Path $worktreePath)) {
        Write-Host "Error: Worktree not found at $worktreePath" -ForegroundColor Red
        return
    }

    git worktree remove $worktreePath --force
    git branch -D $BranchName

    Write-Host "Worktree and branch '$BranchName' removed." -ForegroundColor Green
}
```
{{< /tab >}}
{{% tab "Nushell" %}}
```nu
$env.AGENTS_WORKTREES_PATH = "d:/worktrees"

def "git nwt" [branch_name: string] {
    if ($env.AGENTS_WORKTREES_PATH? | is-empty) {
        print "Error: AGENTS_WORKTREES_PATH environment variable is not set"
        return
    }

    let worktrees_base = $env.AGENTS_WORKTREES_PATH
    let repo_name = (git rev-parse --show-toplevel | path basename)
    let worktree_path = ([$worktrees_base $"($repo_name)-($branch_name)"] | path join)

    git worktree add $worktree_path -b $branch_name

    if $env.LAST_EXIT_CODE == 0 {
        wt.exe -w 0 nt -d $worktree_path nu -c "copilot"
    }
}

def "git rmwt" [branch_name: string] {
    if ($env.AGENTS_WORKTREES_PATH? | is-empty) {
        print "Error: AGENTS_WORKTREES_PATH environment variable is not set"
        return
    }

    let worktrees_base = $env.AGENTS_WORKTREES_PATH
    let repo_name = (git rev-parse --show-toplevel | path basename)
    let worktree_path = ([$worktrees_base $"($repo_name)-($branch_name)"] | path join)

    if not ($worktree_path | path exists) {
        print $"Error: Worktree not found at ($worktree_path)"
        return
    }

    git worktree remove $worktree_path --force
    git branch -D $branch_name

    print $"Worktree and branch '($branch_name)' removed."
}
```
{{< /tab >}}
{{% /tabs %}}

## The Benefits

Since adopting this workflow, I've noticed a few major improvements:

**Context preservation** - I can leave my work exactly as it is, chaos and all, and switch to something else without losing my train of thought.

**No more WIP commits** - Every commit is meaningful. No more "WIP", "temp", or "fix later" commits cluttering my history.

**Parallel experimentation** - I can have multiple agents trying different approaches to the same problem, each in their own worktree, and compare the results.

**Mental clarity** - Knowing that each worktree serves a specific purpose helps me stay organized, even when juggling multiple tasks.

## Wrapping Up

Git worktrees have been part of my toolkit for years, but combining them with AI agents has taken the workflow to another level. The agents get their own isolated space to work, I maintain control and visibility, and everything stays organized without extra overhead.

If you're working with AI coding assistants and haven't tried worktrees yet, I highly recommend giving it a shot. It's one of those workflows that feels awkward for about a day, and then you wonder how you ever lived without it.

The future of development is parallel, both for humans and their AI assistants.
