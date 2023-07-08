import assert from 'assert';
import { formatBladeStringWithPint } from '../formatting/prettier/utils';
import { defaultSettings } from '../formatting/optionDiscovery';

suite('Alpine.js attribute formatting', () => {
    test('it does not trash formatting of embedded php', () => {
        const input = `
<button x-data="var thing = '<?php !$someoneWillDoThis ?> <?= $moreStuff ?>'"></button>
`;
        const out = `<button
    x-data="var thing = '<?php !$someoneWillDoThis ?> <?= $moreStuff ?>'"
></button>
`;
        assert.strictEqual(formatBladeStringWithPint(input), out);
    });

    test('it does reasonable things with javascript inside attributes', () => {
        const input = `
<div
        x-ignore
        ax-load
        ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('file-upload', 'filament/forms') }}"
        x-data="fileUploadFormComponent({
            acceptedFileTypes: @js($getAcceptedFileTypes()),
            deleteUploadedFileUsing: async (fileKey) => {
                return await $wire.deleteUploadedFile(@js($statePath), fileKey)
            },
            getUploadedFilesUsing: async () => {
                return await $wire.getFormUploadedFiles(@js($statePath))
            },
            uploadUsing: (fileKey, file, success, error, progress) => {
                $wire.upload(\`{{ $statePath }}.\${fileKey}\`, file, () => {
                    success(fileKey)
                }, error, progress)
            },
        })"
        wire:ignore
    >
</div>
`;
        const out = `<div
    x-ignore
    ax-load
    ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('file-upload', 'filament/forms') }}"
    x-data="fileUploadFormComponent({
                acceptedFileTypes: @js($getAcceptedFileTypes()),
                deleteUploadedFileUsing: async (fileKey) => {
                    return await $wire.deleteUploadedFile(@js($statePath), fileKey)
                },
                getUploadedFilesUsing: async () => {
                    return await $wire.getFormUploadedFiles(@js($statePath))
                },
                uploadUsing: (fileKey, file, success, error, progress) => {
                    $wire.upload(
                        \`{{ $statePath }}.\${fileKey}\`,
                        file,
                        () => {
                            success(fileKey)
                        },
                        error,
                        progress,
                    )
                },
            })"
    wire:ignore
></div>
`;
        assert.strictEqual(formatBladeStringWithPint(input), out);
    });

    test('js prettier options can be changed', () => {
        const input = `
<div
        x-ignore
        ax-load
        ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('file-upload', 'filament/forms') }}"
        x-data="fileUploadFormComponent({
            acceptedFileTypes: @js($getAcceptedFileTypes()),
            deleteUploadedFileUsing: async (fileKey) => {
                return await $wire.deleteUploadedFile(@js($statePath), fileKey)
            },
            getUploadedFilesUsing: async () => {
                return await $wire.getFormUploadedFiles(@js($statePath))
            },
            uploadUsing: (fileKey, file, success, error, progress) => {
                $wire.upload(\`{{ $statePath }}.\${fileKey}\`, file, () => {
                    success(fileKey)
                }, error, progress)
            },
        })"
        wire:ignore
    >
</div>
`;
        const out = `<div
    x-ignore
    ax-load
    ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('file-upload', 'filament/forms') }}"
    x-data="fileUploadFormComponent({
                acceptedFileTypes: @js($getAcceptedFileTypes()),
                deleteUploadedFileUsing: async (fileKey) => {
                    return await $wire.deleteUploadedFile(@js($statePath), fileKey)
                },
                getUploadedFilesUsing: async () => {
                    return await $wire.getFormUploadedFiles(@js($statePath))
                },
                uploadUsing: (fileKey, file, success, error, progress) => {
                    $wire.upload(
                        \`{{ $statePath }}.\${fileKey}\`,
                        file,
                        () => {
                            success(fileKey)
                        },
                        error,
                        progress
                    )
                },
            })"
    wire:ignore
></div>
`;
        assert.strictEqual(formatBladeStringWithPint(input, {
            ...defaultSettings,
            attributeJsOptions: {
                printWidth: 210,
                semi: false
            }
        }), out);
    });

    test('attribute formatting can be disabled', () => {
        const input = `
<div
        x-ignore
        ax-load
        ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('file-upload', 'filament/forms') }}"
        x-data="fileUploadFormComponent({
            acceptedFileTypes: @js($getAcceptedFileTypes()),
            deleteUploadedFileUsing: async (fileKey) => {
                return await $wire.deleteUploadedFile(@js($statePath), fileKey)
            },
            getUploadedFilesUsing: async () => {
                return await $wire.getFormUploadedFiles(@js($statePath))
            },
            uploadUsing: (fileKey, file, success, error, progress) => {
                $wire.upload(\`{{ $statePath }}.\${fileKey}\`, file, () => {
                    success(fileKey)
                }, error, progress)
            },
        })"
        wire:ignore
    >
</div>
`;
        const expected = `<div
    x-ignore
    ax-load
    ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('file-upload', 'filament/forms') }}"
    x-data="fileUploadFormComponent({
            acceptedFileTypes: @js($getAcceptedFileTypes()),
            deleteUploadedFileUsing: async (fileKey) => {
                return await $wire.deleteUploadedFile(@js($statePath), fileKey)
            },
            getUploadedFilesUsing: async () => {
                return await $wire.getFormUploadedFiles(@js($statePath))
            },
            uploadUsing: (fileKey, file, success, error, progress) => {
                $wire.upload(\`{{ $statePath }}.\${fileKey}\`, file, () => {
                    success(fileKey)
                }, error, progress)
            },
        })"
    wire:ignore
></div>
`;
        assert.strictEqual(formatBladeStringWithPint(input, {
            ...defaultSettings,
            formatJsAttributes: false,
        }), expected);
    });

    test('attribute patterns can be excluded', () => {
        const input = `
<div
        x-ignore
        ax-load
        ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('file-upload', 'filament/forms') }}"
        x-data="fileUploadFormComponent({
            acceptedFileTypes: @js($getAcceptedFileTypes()),
            deleteUploadedFileUsing: async (fileKey) => {
                return await $wire.deleteUploadedFile(@js($statePath), fileKey)
            },
            getUploadedFilesUsing: async () => {
                return await $wire.getFormUploadedFiles(@js($statePath))
            },
            uploadUsing: (fileKey, file, success, error, progress) => {
                $wire.upload(\`{{ $statePath }}.\${fileKey}\`, file, () => {
                    success(fileKey)
                }, error, progress)
            },
        })"
        wire:ignore
    >
</div>
`;
        const expected = `<div
    x-ignore
    ax-load
    ax-load-src="{{ \\Filament\\Support\\Facades\\FilamentAsset::getAlpineComponentSrc('file-upload', 'filament/forms') }}"
    x-data="fileUploadFormComponent({
            acceptedFileTypes: @js($getAcceptedFileTypes()),
            deleteUploadedFileUsing: async (fileKey) => {
                return await $wire.deleteUploadedFile(@js($statePath), fileKey)
            },
            getUploadedFilesUsing: async () => {
                return await $wire.getFormUploadedFiles(@js($statePath))
            },
            uploadUsing: (fileKey, file, success, error, progress) => {
                $wire.upload(\`{{ $statePath }}.\${fileKey}\`, file, () => {
                    success(fileKey)
                }, error, progress)
            },
        })"
    wire:ignore
></div>
`;
        assert.strictEqual(formatBladeStringWithPint(input, {
            ...defaultSettings,
            formatJsAttributes: true,
            excludeJsAttributes: [
                '^ax-',
                '^x-',
            ]
        }), expected);
    });

    test('it can format alpine directives generally', () => {
        const input = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.js" defer></script>
  <title>Alpine.js Directives Test {{ $title }}</title>
</head>
<body>
<template x-for="(month, index) in months"></template>
  <div x-data="{ count: 0 }">
    <button x-on:click="count++">Increment</button>
    <button x-on:click="count--">Decrement</button>
    <p x-text="count"></p>
  </div>

  <div x-data="{ show: false }">
    <button x-on:click="show = !show">Toggle</button>
    <p x-show="show">This paragraph is shown or hidden.</p>
  </div>

  <div x-data="{ open: false }">
    <button x-on:click="open = true">Open</button>
    <button x-on:click="open = false">Close</button>
    <div x-show="open">
      <p>This content is visible when open is true.</p>
    </div>
  </div>
  <ul>
  <template x-for="(fruit, index) in fruits" :key="index">
    <li x-text="fruit"></li>
  </template>
</ul>

  <div x-data="{ tab: 'one' }">
    <button x-on:click="tab = 'one'">Tab One</button>
    <button x-on:click="tab = 'two'">Tab Two</button>
    <div x-show="tab === 'one'">
      <p>This is the content of Tab One.</p>
    </div>
    <div x-show="tab === 'two'">
      <p>This is the content of Tab Two.</p>
    </div>
  </div>

  <div x-data="{ items: ['Apple', 'Banana', 'Orange'] }">
    <ul>
      <template x-for="item in items">
        <li x-text="item"></li>
      </template>
    </ul>
  </div>

  <div x-data="{ message: 'Hello, World!' }">
    <input x-model="message" type="text">
    <p x-text="message"></p>
  </div>
</body>
</html>`;
        const out = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
            src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.js"
            defer
        ></script>
        <title>Alpine.js Directives Test {{ $title }}</title>
    </head>
    <body>
        <template x-for="(month, index) in months"></template>
        <div x-data="{ count: 0 }">
            <button x-on:click="count++">Increment</button>
            <button x-on:click="count--">Decrement</button>
            <p x-text="count"></p>
        </div>

        <div x-data="{ show: false }">
            <button x-on:click="show = !show">Toggle</button>
            <p x-show="show">This paragraph is shown or hidden.</p>
        </div>

        <div x-data="{ open: false }">
            <button x-on:click="open = true">Open</button>
            <button x-on:click="open = false">Close</button>
            <div x-show="open">
                <p>This content is visible when open is true.</p>
            </div>
        </div>
        <ul>
            <template x-for="(fruit, index) in fruits" :key="index">
                <li x-text="fruit"></li>
            </template>
        </ul>

        <div x-data="{ tab: 'one' }">
            <button x-on:click="tab = 'one'">Tab One</button>
            <button x-on:click="tab = 'two'">Tab Two</button>
            <div x-show="tab === 'one'">
                <p>This is the content of Tab One.</p>
            </div>
            <div x-show="tab === 'two'">
                <p>This is the content of Tab Two.</p>
            </div>
        </div>

        <div x-data="{ items: ['Apple', 'Banana', 'Orange'] }">
            <ul>
                <template x-for="item in items">
                    <li x-text="item"></li>
                </template>
            </ul>
        </div>

        <div x-data="{ message: 'Hello, World!' }">
            <input x-model="message" type="text" />
            <p x-text="message"></p>
        </div>
    </body>
</html>
`;
        assert.strictEqual(formatBladeStringWithPint(input), out);
    });

    test('it formats alpinejs directives generally #2', () => {
        const input = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.js" defer></script>
  <title>Alpine.js Directives Test</title>
  <style>
    [x-cloak] { display: none; }
  </style>
</head>
<body>
  <div x-data="{ greeting: 'Hello', name: 'John', showName: true, fruits: ['Apple', 'Banana', 'Orange'] }">
    <h1 x-bind:x-text="greeting + ' ' + name"></h1>
    <button x-on:click="showName = !showName">Toggle Name</button>
    <p x-if="showName" x-text="name"></p>
    <ul>
      <template x-for="(fruit, index) in fruits" :key="index">
        <li x-text="fruit"></li>
      </template>
    </ul>
    <div x-show="showName">
      <p>This content is shown when the name is visible.</p>
    </div>
  </div>

  <div x-data="{ isOpen: false }">
    <button x-on:click="isOpen = !isOpen">Toggle</button>
    <div x-show="isOpen" x-bind:id="'collapse-' + xid()" x-cloak>
      <p>This is a collapsible section.</p>
    </div>
  </div>

  <script>
    function xid() {
      return Math.random().toString(36).substr(2, 9);
    }
  </script>
</body>
</html>`;
        const out = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
            src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.js"
            defer
        ></script>
        <title>Alpine.js Directives Test</title>
        <style>
            [x-cloak] {
                display: none;
            }
        </style>
    </head>
    <body>
        <div
            x-data="{
                greeting: 'Hello',
                name: 'John',
                showName: true,
                fruits: ['Apple', 'Banana', 'Orange'],
            }"
        >
            <h1 x-bind:x-text="greeting + ' ' + name"></h1>
            <button x-on:click="showName = !showName">Toggle Name</button>
            <p x-if="showName" x-text="name"></p>
            <ul>
                <template x-for="(fruit, index) in fruits" :key="index">
                    <li x-text="fruit"></li>
                </template>
            </ul>
            <div x-show="showName">
                <p>This content is shown when the name is visible.</p>
            </div>
        </div>

        <div x-data="{ isOpen: false }">
            <button x-on:click="isOpen = !isOpen">Toggle</button>
            <div x-show="isOpen" x-bind:id="'collapse-' + xid()" x-cloak>
                <p>This is a collapsible section.</p>
            </div>
        </div>

        <script>
            function xid() {
                return Math.random().toString(36).substr(2, 9);
            }
        </script>
    </body>
</html>
`;
        assert.strictEqual(formatBladeStringWithPint(input), out);
    });

    test('it automatically ignores things that might be formatted as subtraction', () => {
        const input = `<div
class="relative group"
@if($isMultiple && $isReorderable)
    x-sortable-handle
 x-sortable-item="image-{{ $image->id }}"
 @endif
>
</div>`;
        const out = `<div
    class="group relative"
    @if ($isMultiple && $isReorderable)
        x-sortable-handle
        x-sortable-item="image-{{ $image->id }}"
    @endif
></div>
`;
        assert.strictEqual(formatBladeStringWithPint(input), out);
    });
});