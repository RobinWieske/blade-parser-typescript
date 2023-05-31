import assert from 'assert';
import { formatBladeStringWithPint } from '../../../formatting/prettier/utils';
import { StringUtilities } from '../../../utilities/stringUtilities';

suite('Pint Transformer Accpetance: support_resources_views_components_icon_blade_php', () => {
    test('pint: it can format support_resources_views_components_icon_blade_php', () => {
        const input = `@props([
    'alias' => null,
    'class' => [],
    'color' => null,
    'group' => null,
    'name' => null,
    'size',
])

@php
    $icon = $alias ? \\Filament\\Support\\Facades\\FilamentIcon::resolve($alias) : null;
    $group = $group ? \\Filament\\Support\\Facades\\FilamentIcon::resolve($group) : null;

    if ($icon?->name) {
        $name = $icon->name;
    }

    $class = [
        ...($group?->class ?? []),
        ...($icon?->class ?? []),
        ...Arr::wrap($class),
    ];

    $color = $icon?->color ?? $group?->color ?? $color;

    if ($color !== null) {
        $class[] = $color;
    }

    $class[] = $icon?->size ?? $group?->size ?? $size;
@endphp

@if ($name)
    @svg($name, \\Illuminate\\Support\\Arr::toCssClasses($class), array_filter($attributes->getAttributes()))
@else
    <div {{ $attributes->class($class) }}>
        {{ $slot }}
    </div>
@endif
`;
        const output = `@props([
    'alias' => null,
    'class' => [],
    'color' => null,
    'group' => null,
    'name' => null,
    'size',
])

@php
    $icon = $alias ? \\Filament\\Support\\Facades\\FilamentIcon::resolve($alias) : null;
    $group = $group ? \\Filament\\Support\\Facades\\FilamentIcon::resolve($group) : null;

    if ($icon?->name) {
        $name = $icon->name;
    }

    $class = [
        ...($group?->class ?? []),
        ...($icon?->class ?? []),
        ...Arr::wrap($class),
    ];

    $color = $icon?->color ?? $group?->color ?? $color;

    if ($color !== null) {
        $class[] = $color;
    }

    $class[] = $icon?->size ?? $group?->size ?? $size;
@endphp

@if ($name)
    @svg($name, \\Illuminate\\Support\\Arr::toCssClasses($class), array_filter($attributes->getAttributes()))
@else
    <div {{ $attributes->class($class) }}>
        {{ $slot }}
    </div>
@endif
`;

        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(input).trim()), StringUtilities.normalizeLineEndings(output.trim()));
        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(output).trim()), StringUtilities.normalizeLineEndings(output.trim()));
    }).timeout(30000);
});