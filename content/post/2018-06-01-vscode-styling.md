---
categories:
- dev
date: 2018-06-01
description: We can't all spend $200 on a font that looks super slick. But maybe we can settle for an alternative solution when using VSCode.
tags:
- windows
- vscode
- css
- fonts
- style
- editor
- operatormono
title: "A viable alternative to Operator Mono in Visual Studio Code"
url: /operator-mono-alternative
---

After seeing <a href="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl&WT.mc_id=twitter-social-sdras" target="_blank">Night Owl</a>, a color theme for VSCode created by <a href="https://twitter.com/sarah_edo/status/997238414390022144" target="_blank">Sarah Drasner</a> **leveraging the use of italics** and a font supporting this, I was hesitant about either pruchasing Dank Mono (less mature, but already super nice Operator Mono alternative), or start the search for free alternative. Given that it's in my nature to switch interests every two seconds, I made the call not to spend money a hype, but instead look for hacks which must surely be out there.

At first, my search for free alternatives to Operator Mono guided me towards <a href="https://github.com/kencrocken/FiraCodeiScript" target="_blank">FiraCodeiScript</a> made by Ken Krocken. What it does is make two fonts look like one, so you have Fira Code as the regular font and Script12 as the italic font. They were edited using <a href="https://fontforge.github.io" target="_blank">FontForge</a>, a tool used to create or alter fonts. My first impression was _That's pretty cool_, but after a while I couldn't help but not really liking Script12.

I figured I had to **create my own version**. As I'm a programmer, I didn't want to mess with a GUI tool and decided to go for a Python script using <a href="https://github.com/fonttools/fonttools" target="_blank">FontTools</a> to edit the font files and make them appear as one font family. The information on how to do this is available in the following <a href="https://github.com/open-source-ideas/open-source-ideas/issues/10#issuecomment-360999485" target="_blank">issue</a> on the Open Soure Idea's repository on GitHub.

FontTools turned out to work against rather than with me, for some reason I couldn't always figure out where to find the fields I needed to adjust. **The quest for a better module began**. My terminal fonts always come from the <a href="https://github.com/ryanoasis/nerd-fonts" target="_blank">Nerd Fonts</a> repository, and as they also need to rename fonts due to licensing issues, it was the best place to start digging.

They use a <a href="https://github.com/ryanoasis/nerd-fonts/blob/master/font-patcher" target="_blank">Python script</a> to edit the font files and append loads of cool stuff, and guess what, it's using the Python module included in FontForge. Cool! Easy, right? Nope. I'm using Windows 10 by choice and this time, it hit me in the nuts. You can't install the module using `pip install FontForge`, it's included in the installation of FontForge. On Linux you can install bindings to expose the module and use it in your scripts, but there's no such option for Windows.

Back to the thinking cabin! Looking at how FontForge works, it embeds Python 2.7 (🤦‍) which gives you the FontForge module out of the box. Being pragmatic and all, I decided to use that Python executable to create the script. Using VSCode, you can adjust your debug settings (located at `projectroot\.vscode\launch.json`) to do just that.

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python Experimental: Current File (Integrated Terminal)",
            "type": "pythonExperimental",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "pythonPath": "C:\\Program Files (x86)\\FontForgeBuilds\\bin\\ffpython.exe"
        }
    ]
}
```

This way you can _easily_ import the FontForge module and create a script that alterts two font files to a newly invented font family. I really like Fira Code, so I downloaded <a href="https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/FiraCode/Regular/complete" target="_blank">Fura Code</a> from Nerd Fonts to hold all interesting bits and pieces, and fell in love with <a href="https://fonts.google.com/specimen/Yellowtail" target="_blank">Yellowtail</a> to use as the italic variant.

```python
import fontforge
import uuid


def change_font_data_and_save(font_location, familyname,
                              sub_family, output_dir, uid):
    source_font = fontforge.open(font_location)
    source_font.familyname = familyname
    source_font.fullname = '{} {}'.format(familyname, sub_family)
    source_font.fontname = '{}-{}'.format(familyname, sub_family)
    source_font.appendSFNTName(str('English (US)'), str('Family'),
                               source_font.familyname)
    source_font.appendSFNTName(str('English (US)'), str('SubFamily'),
                               sub_family)
    source_font.appendSFNTName(str('English (US)'), str('UniqueID'),
                               uid)
    source_font.appendSFNTName(str('English (US)'), str('Preferred Family'),
                               source_font.familyname)
    source_font.appendSFNTName(str('English (US)'), str('Compatible Full'),
                               source_font.fullname)
    source_font.generate(output_dir + '/' + source_font.fullname + '.ttf',
                         flags=(str('opentype'), str('PfEd-comments')))


regular_font = 'path_to_fura_code.tff'
italic_font = 'path_to_yellowtail.ttf'
output_dir = './output'
familyname = 'VSCode Font'
uid = str(uuid.uuid4())
change_font_data_and_save(regular_font, familyname, 'Regular', output_dir, uid)
change_font_data_and_save(italic_font, familyname, 'Italic', output_dir, uid)
```

This works like a charm, you get two fonts in the output folder which you can then install as one font family, adjust VSCode to use that font and profit. With **one annoying side-effect**. Depending on the difference between the two fonts, you might need to scale one of them. I did so for Yellowtail resulting in some letters being chopped off when a sentence start with an italic word. In the sample above, whenever `def` was on position 0 of a line, the `d` is slightly cut off at the beginning. I don't need to explain this is not a desired effect.

I went to have a look at the other custom fonts and **they all have the same issue** depending on the font they use. An alternative solution which works a lot better is to use the <a href="https://github.com/be5invis/vscode-custom-css" target="_blank">Custom CSS and JS plugin</a> to alter the font size when a word is italic (can be distinguished by the `mkti` class). But, and this is important, if we do this, then we lose the use-case for a custom font.

So, after losing a few hours to get this right, I went for the custom CSS solution. I installed all variants of Fura Code and the Yellowtail font and created an override for the `mkti` class using the Custom CSS and JS plugin. To do so, create a file with the following content. Alter the font family per your liking, after playing with a few handwritten fonts, I went for <a href="https://www.dafont.com/flottflott.font" target="_blank">Flottflott</a> in the end.

```css
.mtki {
    font-size: 1.6em;
    font-family: Flottflott;
}
```

This will make the text bigger, but still respect the bounds of the window. So you get the same result font wise, but better. If you're on Windows, make sure to run VSCode elevated when applying the style (and re-applying whenever you update VSCode).

On to theming. We all use different themes, and not every theme has support for italic keywords. Now, instead of creating a custom theme, I want to teach you how to override the theme settings so that they will be applied no matter the theme you're using. I switch themes like clothes (you can define whether that applies a lot or not 😲), so I don't want to go fiddling with this every time.

As it turns out, VSCode adheres to the TextMate grammer syntax to define how it needs to render code. I found a nice <a href="https://www.sublimetext.com/docs/3/scope_naming.html" target="_blank">guide</a> from another undisclosed editor, which, in combination with looking at existing themes and how they do it, allowed me to get started. Currently my config looks like this.

```json
"editor.fontFamily": "FuraCode NF",
"editor.fontLigatures": true,
"vscode_custom_css.imports": [
    "file://C:/Users/jan/.vscode_css_settings.css"
],
"vscode_custom_css.policy": true,
"editor.tokenColorCustomizations": {
    "textMateRules": [
        {
            "scope": [
                "storage.modifier",
                "variable.language",
                "markup.italic",
                "punctuation.definition.keyword",
                "keyword.control.import",
                "storage.type.class",
                "storage.type.function",
                "storage.modifier"
            ],
            "settings": {
                "fontStyle": "italic"
            }
        },
        {
            "scope": [
                //following will be excluded from italics
                "comment",
                "invalid",
                "keyword.operator",
                "keyword.control.conditional",
                "storage.type.function.arrow.js"
            ],
            "settings": {
                "fontStyle": ""
            }
        }
    ]
},
```

There are two overrides, one that explicitly says what to render italic (and thus add the `mkti` class), and another to exclude keywords from being rendered italic. This way I can use whatever theme I like, my settings will make the right words appear italic and pretty. This list isn't complete, there are a lot more which can be added. In the end it depends on the theme, language and personal taste to define what it needs to look like.

I hope you'll have as much fun customizing your editor as I had trying to find a silver bullet 😄.

<img src="/img/italic.png" alt="italic" width="800"/>
