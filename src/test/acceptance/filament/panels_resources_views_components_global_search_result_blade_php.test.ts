import assert from 'assert';
import { formatBladeStringWithPint } from '../../../formatting/prettier/utils';
import { StringUtilities } from '../../../utilities/stringUtilities';

suite('Pint Transformer Accpetance: panels_resources_views_components_global_search_result_blade_php', () => {
    test('pint: it can format panels_resources_views_components_global_search_result_blade_php', () => {
        const input = `@props([
    'actions' => [],
    'details' => [],
    'title',
    'url',
])

<li {{ $attributes->class(['filament-global-search-result']) }}>
    <div class="relative block px-6 py-4 focus:bg-gray-500/5 hover:bg-gray-500/5 focus:ring-1 focus:ring-gray-300">
        <a href="{{ $url }}" class="">
            <p class="font-medium dark:text-gray-200">
                {{ $title }}
            </p>

            <p class="text-sm space-x-2 rtl:space-x-reverse font-medium text-gray-500 dark:text-gray-400">
                @foreach ($details as $label => $value)
                    <span>
                        <span class="font-medium text-gray-700 dark:text-gray-200">
                            {{ $label }}:
                        </span>

                        <span>
                            {{ $value }}
                        </span>
                    </span>
                @endforeach
            </p>
        </a>

        @if ($actions)
            <x-filament::global-search.actions :actions="$actions" />
        @endif
    </div>
</li>
`;
        const output = `@props([
    'actions' => [],
    'details' => [],
    'title',
    'url',
])

<li {{ $attributes->class(['filament-global-search-result']) }}>
    <div
        class="relative block px-6 py-4 hover:bg-gray-500/5 focus:bg-gray-500/5 focus:ring-1 focus:ring-gray-300"
    >
        <a href="{{ $url }}" class="">
            <p class="font-medium dark:text-gray-200">
                {{ $title }}
            </p>

            <p
                class="space-x-2 text-sm font-medium text-gray-500 rtl:space-x-reverse dark:text-gray-400"
            >
                @foreach ($details as $label => $value)
                    <span>
                        <span
                            class="font-medium text-gray-700 dark:text-gray-200"
                        >
                            {{ $label }}:
                        </span>

                        <span>
                            {{ $value }}
                        </span>
                    </span>
                @endforeach
            </p>
        </a>

        @if ($actions)
            <x-filament::global-search.actions :actions="$actions" />
        @endif
    </div>
</li>
`;

        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(input).trim()), StringUtilities.normalizeLineEndings(output.trim()));
        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(output).trim()), StringUtilities.normalizeLineEndings(output.trim()));
    }).timeout(30000);
});