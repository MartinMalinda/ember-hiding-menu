# Ember-hiding-menu

Simple addon that allows content to be hidden on scrolling down and reappear on scrolling up. (By toggling a class).

DEMO: https://martinmalinda.github.io/ember-hiding-menu/

## 1) Install the addon

```
ember install ember-hiding-menu
```

## 2) Import SCSS

```css
@import 'hiding-menu';
```

## 3) Use it

```hbs
{{#hiding-menu throttleTime=200 topTolerance=50 class="my-menu"}}
  {{link-to "somewhere"}}
{{/hiding-menu}}

{{#hiding-menu class="bottom"}}
  This menu is fixed on bottom.
{{/hiding-menu}}
```
