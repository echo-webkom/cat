<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Placeholder from '@tiptap/extension-placeholder'

  let {
    placeholder = 'write something...',
    minHeight = '200px',
    content = '',
    onchange,
  }: {
    placeholder?: string
    minHeight?: string
    content?: string
    onchange?: (html: string) => void
  } = $props()

  let element = $state<HTMLDivElement | null>(null)
  let editor = $state<Editor | null>(null)

  let active = $state({
    bold: false,
    italic: false,
    h2: false,
    h3: false,
    bulletList: false,
    orderedList: false,
    codeBlock: false,
    blockquote: false,
  })

  function syncActive(e: Editor) {
    active = {
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bulletList: e.isActive('bulletList'),
      orderedList: e.isActive('orderedList'),
      codeBlock: e.isActive('codeBlock'),
      blockquote: e.isActive('blockquote'),
    }
  }

  onMount(() => {
    editor = new Editor({
      element,
      content,
      extensions: [StarterKit, Placeholder.configure({ placeholder })],
      onUpdate({ editor: e }) {
        syncActive(e)
        onchange?.(e.getHTML())
      },
      onSelectionUpdate({ editor: e }) {
        syncActive(e)
      },
    })
  })

  onDestroy(() => editor?.destroy())

  function run(fn: () => void) {
    fn()
    editor?.commands.focus()
  }

  const btnClass = (on: boolean) =>
    `px-2 py-1 text-xs border transition-colors ${on ? 'border-[#00ff88]/40 text-[#00ff88]' : 'border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-200'}`
</script>

<div class="border border-zinc-800 bg-zinc-900 transition-colors focus-within:border-[#00ff88]/40">
  {#if editor}
    <div class="flex flex-wrap gap-1 border-b border-zinc-800 p-2">
      <button
        type="button"
        class={btnClass(active.bold)}
        onclick={() => run(() => editor!.chain().toggleBold().run())}>B</button
      >
      <button
        type="button"
        class={btnClass(active.italic)}
        onclick={() => run(() => editor!.chain().toggleItalic().run())}><em>I</em></button
      >
      <div class="w-px self-stretch bg-zinc-800 mx-0.5"></div>
      <button
        type="button"
        class={btnClass(active.h2)}
        onclick={() => run(() => editor!.chain().toggleHeading({ level: 2 }).run())}>H2</button
      >
      <button
        type="button"
        class={btnClass(active.h3)}
        onclick={() => run(() => editor!.chain().toggleHeading({ level: 3 }).run())}>H3</button
      >
      <div class="w-px self-stretch bg-zinc-800 mx-0.5"></div>
      <button
        type="button"
        class={btnClass(active.bulletList)}
        onclick={() => run(() => editor!.chain().toggleBulletList().run())}>•—</button
      >
      <button
        type="button"
        class={btnClass(active.orderedList)}
        onclick={() => run(() => editor!.chain().toggleOrderedList().run())}>1.</button
      >
      <div class="w-px self-stretch bg-zinc-800 mx-0.5"></div>
      <button
        type="button"
        class={btnClass(active.codeBlock)}
        onclick={() => run(() => editor!.chain().toggleCodeBlock().run())}>&lt;/&gt;</button
      >
      <button
        type="button"
        class={btnClass(active.blockquote)}
        onclick={() => run(() => editor!.chain().toggleBlockquote().run())}>"</button
      >
    </div>
  {/if}

  <div bind:this={element} class="tiptap-content px-4 py-3" style="min-height: {minHeight}"></div>
</div>

<style>
  :global(.tiptap-content .ProseMirror) {
    outline: none;
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    line-height: 1.7;
    color: #e8e8e8;
  }

  :global(.tiptap-content .ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    color: #52525b;
    pointer-events: none;
    height: 0;
  }

  :global(.tiptap-content .ProseMirror h2) {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    margin: 1.25rem 0 0.5rem;
  }

  :global(.tiptap-content .ProseMirror h3) {
    font-family: var(--font-mono);
    font-size: 1.05rem;
    font-weight: 700;
    color: #d4d4d8;
    margin: 1rem 0 0.4rem;
  }

  :global(.tiptap-content .ProseMirror p) {
    margin-bottom: 0.75rem;
  }

  :global(.tiptap-content .ProseMirror strong) {
    color: #fff;
    font-weight: 600;
  }

  :global(.tiptap-content .ProseMirror em) {
    color: #a1a1aa;
  }

  :global(.tiptap-content .ProseMirror ul),
  :global(.tiptap-content .ProseMirror ol) {
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
  }

  :global(.tiptap-content .ProseMirror ul) {
    list-style-type: none;
  }

  :global(.tiptap-content .ProseMirror ul li::before) {
    content: '→ ';
    color: #00ff88;
    font-family: var(--font-mono);
    margin-left: -1.5rem;
    margin-right: 0.25rem;
  }

  :global(.tiptap-content .ProseMirror ol) {
    list-style-type: decimal;
    color: #00ff88;
  }

  :global(.tiptap-content .ProseMirror ol li) {
    color: #e8e8e8;
  }

  :global(.tiptap-content .ProseMirror code) {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    background: #18181b;
    color: #00ff88;
    padding: 0.1em 0.4em;
    border: 1px solid #27272a;
  }

  :global(.tiptap-content .ProseMirror pre) {
    background: #0d0d0d;
    border: 1px solid #27272a;
    border-left: 2px solid #00ff88;
    padding: 1rem;
    margin-bottom: 0.75rem;
    overflow-x: auto;
  }

  :global(.tiptap-content .ProseMirror pre code) {
    background: none;
    border: none;
    padding: 0;
    color: #e8e8e8;
  }

  :global(.tiptap-content .ProseMirror blockquote) {
    border-left: 2px solid #00ff88;
    padding-left: 1rem;
    margin: 0.75rem 0;
    color: #a1a1aa;
    font-style: italic;
  }

  :global(.tiptap-content .ProseMirror hr) {
    border: none;
    border-top: 1px solid #27272a;
    margin: 1rem 0;
  }
</style>
