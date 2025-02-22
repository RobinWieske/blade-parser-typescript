import assert from 'assert';
import { formatBladeStringWithPint } from '../../../formatting/prettier/utils.js';
import { StringUtilities } from '../../../utilities/stringUtilities.js';
import { setupTestHooks } from '../../../test/testUtils/formatting.js';

suite('Pint Transformer Acceptance: forms_resources_views_components_markdown_editor_blade_php', () => {
    setupTestHooks();
    test('pint: it can format forms_resources_views_components_markdown_editor_blade_php', async () => {
        const input = `<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    @php
        $id = $getId();
        $statePath = $getStatePath();
    @endphp

    @unless ($isDisabled())
        <div
            x-ignore
            ax-load="visible"
            ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('markdown-editor', 'filament/forms') }}"
            x-data="markdownEditorFormComponent({
                placeholder: @js($getPlaceholder()),
                state: $wire.{{ $applyStateBindingModifiers("entangle({$statePath})") }},
                toolbarButtons: @js($getToolbarButtons()),
                translations: @js(__('filament-forms::components.markdown_editor')),
                uploadFileAttachmentUsing: async (file, onSuccess, onError) => {
                    $wire.upload(\`componentFileAttachments.{{ $statePath }}\`, file, () => {
                        $wire.getFormComponentFileAttachmentUrl('{{ $statePath }}').then((url) => {
                            if (! url) {
                                return onError()
                            }

                            onSuccess(url)
                        })
                    })
                },
            })"
            wire:ignore
            {{
                $attributes
                    ->merge($getExtraAttributes(), escape: false)
                    ->merge($getExtraAlpineAttributes(), escape: false)
                    ->class(['filament-forms-markdown-editor-component font-mono'])
            }}
        >
            <textarea x-ref="editor" class="hidden"></textarea>
        </div>
    @else
        <div class="prose block w-full max-w-none rounded-lg border border-gray-300 bg-white p-3 opacity-70 shadow-sm dark:prose-invert dark:border-gray-600 dark:bg-gray-700">
            {!! str($getState())->markdown()->sanitizeHtml() !!}
        </div>
    @endunless
</x-dynamic-component>
`;
        const output = `<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    @php
        $id = $getId();
        $statePath = $getStatePath();
    @endphp

    @unless ($isDisabled())
        <div
            x-ignore
            ax-load="visible"
            ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('markdown-editor', 'filament/forms') }}"
            x-data="markdownEditorFormComponent({
                        placeholder: @js($getPlaceholder()),
                        state: $wire.{{ $applyStateBindingModifiers("entangle({$statePath})") }},
                        toolbarButtons: @js($getToolbarButtons()),
                        translations: @js(__('filament-forms::components.markdown_editor')),
                        uploadFileAttachmentUsing: async (file, onSuccess, onError) => {
                            $wire.upload(\`componentFileAttachments.{{ $statePath }}\`, file, () => {
                                $wire
                                    .getFormComponentFileAttachmentUrl('{{ $statePath }}')
                                    .then((url) => {
                                        if (! url) {
                                            return onError()
                                        }

                                        onSuccess(url)
                                    })
                            })
                        },
                    })"
            wire:ignore
            {{
                $attributes
                    ->merge($getExtraAttributes(), escape: false)
                    ->merge($getExtraAlpineAttributes(), escape: false)
                    ->class(['filament-forms-markdown-editor-component font-mono'])
            }}
        >
            <textarea x-ref="editor" class="hidden"></textarea>
        </div>
    @else
        <div
            class="prose dark:prose-invert block w-full max-w-none rounded-lg border border-gray-300 bg-white p-3 opacity-70 shadow-sm dark:border-gray-600 dark:bg-gray-700"
        >
            {!! str($getState())->markdown()->sanitizeHtml() !!}
        </div>
    @endunless
</x-dynamic-component>
`;

        assert.strictEqual(StringUtilities.normalizeLineEndings((await formatBladeStringWithPint(input)).trim()), StringUtilities.normalizeLineEndings(output.trim()));
        assert.strictEqual(StringUtilities.normalizeLineEndings((await formatBladeStringWithPint(output)).trim()), StringUtilities.normalizeLineEndings(output.trim()));
    }).timeout(30000);
});