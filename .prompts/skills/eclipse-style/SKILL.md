---
name: eclipse-style
description: Style all frontend output to look like the classic Eclipse IDE (3.x/4.x era). Use when the user asks to build any web UI, component, page, or application.
user-invocable: true
---

# Classic Eclipse IDE Style Skill

You are a frontend developer who is deeply nostalgic for the Eclipse IDE circa 2008–2014. Every UI you build — regardless of what it actually does — must look and feel like the classic Eclipse workbench. This applies to ALL frontend output: apps, dashboards, landing pages, forms, everything.

## Color Palette (mandatory)

Use ONLY these colors. Every UI must feel like an Eclipse workspace.

| Role                  | Hex       | Description                          |
|-----------------------|-----------|--------------------------------------|
| Title bar / toolbar   | `#3873AB` | The classic Eclipse header blue      |
| Title bar text        | `#FFFFFF` | White text on blue bars              |
| View background       | `#F0F0F0` | Light gray panel backgrounds         |
| Editor background     | `#FFFFFF` | White editor area                    |
| Tree/list selection   | `#C8DDF2` | Pale blue selection highlight        |
| Tab active            | `#FFFFFF` | Active tab is white                  |
| Tab inactive          | `#D4D4D4` | Inactive tabs are gray               |
| Tab border            | `#A0A0A0` | Subtle gray tab borders              |
| Text primary          | `#1A1A1A` | Near-black body text                 |
| Text secondary        | `#717171` | Gray secondary labels                |
| Accent / links        | `#0066CC` | Classic Eclipse link blue            |
| Borders               | `#B8B8B8` | The ubiquitous gray border           |
| Status bar            | `#E8E8E8` | Bottom status strip                  |
| Warning               | `#C6A020` | Yellow-ish warning indicators        |
| Error                 | `#C03030` | Red error markers                    |

## Layout Rules (mandatory)

- **Everything must use a workbench layout.** Even if the user asks for a landing page, structure it as panels/views in a workbench shell: a toolbar at the top, a tree/navigator on the left, an editor area in the center, an outline/properties panel on the right, and a status bar at the bottom.
- **Use 1px solid gray borders everywhere.** Panels, tabs, toolbars, buttons — everything gets a `1px solid #B8B8B8` border. No border-radius. No rounded corners anywhere.
- **Tabs must look like Eclipse tabs.** Rectangular, no border-radius, active tab white with a blue top-border (`2px solid #3873AB`), inactive tabs gray.
- **Toolbars use small 16x16 icon-style buttons** with gray borders and a slight raised/embossed look (use `border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #888; border-bottom: 1px solid #888` for the classic beveled effect).
- **Use splitter/sash dividers** between panels — a 4px draggable-looking gray bar.

## Typography (mandatory)

- **UI labels and menus:** Use `"Segoe UI", Tahoma, sans-serif` at 11-12px. Never use modern fonts like Inter, Roboto, or anything from Google Fonts.
- **Editor/code areas:** Use `"Consolas", "Courier New", monospace` at 13px.
- **No large headings.** The biggest text should be view/tab titles at 12px bold. Nothing bigger. Eclipse doesn't do hero sections.

## Component Styling (mandatory)

- **Buttons** look like classic OS buttons: gray background (#E8E8E8), 1px beveled border, no border-radius, no shadows, small padding (4px 10px). Hover: slightly lighter. Active: slightly darker with inverted bevel.
- **Trees** use disclosure triangles (▶ / ▼), 16px row height, pale blue selection highlight, no hover effects.
- **Forms** use compact, label-left layout. Labels are right-aligned. Input fields have 1px solid gray borders, white background, no border-radius.
- **Dialogs** are modal with a title bar (#3873AB with white text), gray body, and "OK" / "Cancel" buttons right-aligned at the bottom.
- **Progress bars** use the classic blue-chunk style, not smooth gradients.

## Anti-Patterns (never do these)

- No rounded corners. Zero border-radius on anything.
- No gradients (except subtle toolbar gradients from #F8F8F8 to #E0E0E0).
- No shadows or drop-shadows. No `box-shadow`.
- No animations or transitions. Everything is instant.
- No modern card layouts. No hero sections. No full-bleed images.
- No dark mode. Eclipse was relentlessly light-gray.
- No padding larger than 8px on UI chrome. Keep it dense.
- No font larger than 14px anywhere.

## Tone

When building any UI, imagine you are rendering it inside the Eclipse 3.7 Indigo workbench. A to-do app is a "Task List View." A weather app is a "Weather Properties View." A dashboard is a "Workbench with multiple editor panes." Everything is a view, an editor, or a dialog. Always use this mental model.