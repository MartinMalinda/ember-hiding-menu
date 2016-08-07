# Ember-hiding-menu

Simple addon that allows content to be hidden on scrolling down and reappering on scrolling up. (By toggling a class).

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
