import assert from 'assert';
import { formatBladeStringWithPint } from '../../../formatting/prettier/utils';
import { StringUtilities } from '../../../utilities/stringUtilities';

suite('Pint Transformer Accpetance: notifications_resources_views_components_database_modal_actions_blade_php', () => {
    test('pint: it can format notifications_resources_views_components_database_modal_actions_blade_php', () => {
        const input = `@props([
    'notifications',
    'unreadNotificationsCount',
])

<div {{ $attributes }}>
    @if ($notifications->count())
        <div class="mt-2 text-sm">
            @if ($unreadNotificationsCount)
                <x-filament::link
                    wire:click="markAllNotificationsAsRead"
                    color="gray"
                    tag="button"
                    tabindex="-1"
                    wire:target="markAllNotificationsAsRead"
                    wire:loading.attr="disabled"
                    class="disabled:opacity-70 disabled:pointer-events-none"
                >
                    {{ __('filament-notifications::database.modal.buttons.mark_all_as_read.label') }}
                </x-filament::link>

                <span>
                    &bull;
                </span>
            @endif

            <x-filament::link
                wire:click="clearNotifications"
                x-on:click="close()"
                color="gray"
                tag="button"
                tabindex="-1"
                wire:target="clearNotifications"
                wire:loading.attr="disabled"
                class="disabled:opacity-70 disabled:pointer-events-none"
            >
                {{ __('filament-notifications::database.modal.buttons.clear.label') }}
            </x-filament::link>
        </div>
    @endif
</div>
`;
        const output = `@props([
    'notifications',
    'unreadNotificationsCount',
])

<div {{ $attributes }}>
    @if ($notifications->count())
        <div class="mt-2 text-sm">
            @if ($unreadNotificationsCount)
                <x-filament::link
                    wire:click="markAllNotificationsAsRead"
                    color="gray"
                    tag="button"
                    tabindex="-1"
                    wire:target="markAllNotificationsAsRead"
                    wire:loading.attr="disabled"
                    class="disabled:opacity-70 disabled:pointer-events-none"
                >
                    {{ __('filament-notifications::database.modal.buttons.mark_all_as_read.label') }}
                </x-filament::link>

                <span>&bull;</span>
            @endif

            <x-filament::link
                wire:click="clearNotifications"
                x-on:click="close()"
                color="gray"
                tag="button"
                tabindex="-1"
                wire:target="clearNotifications"
                wire:loading.attr="disabled"
                class="disabled:opacity-70 disabled:pointer-events-none"
            >
                {{ __('filament-notifications::database.modal.buttons.clear.label') }}
            </x-filament::link>
        </div>
    @endif
</div>
`;

        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(input).trim()), StringUtilities.normalizeLineEndings(output.trim()));
        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(output).trim()), StringUtilities.normalizeLineEndings(output.trim()));
    }).timeout(30000);
});