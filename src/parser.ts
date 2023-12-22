// Internal file used to debug the parser.

import { formatBladeString, formatBladeStringWithPint } from './formatting/prettier/utils.js';

const input = `
<x-filament::grid
    :x-on:form-validation-error.window="
        $isRoot ? ('if ($event.detail.livewireId !== ' . Js::from($this->getId()) . ') {
            return
        }

        $nextTick(() => {
            error = $el.querySelector(\\'[data-validation-error]\\')

            if (! error) {
                return
            }

            elementToExpand = error

            while (elementToExpand) {
                elementToExpand.dispatchEvent(new CustomEvent(\\'expand\\'))

                elementToExpand = elementToExpand.parentNode
            }

            setTimeout(
                () =>
                    error.closest(\\'[data-field-wrapper]\\').scrollIntoView({
                        behavior: \\'smooth\\',
                        block: \\'start\\',
                        inline: \\'start\\',
                    }),
                200,
            )
        })') : null
    "
>
    {{-- --}}
</x-filament::grid>

`;

formatBladeString(input).then(function (r) {
    console.log(r);
});
