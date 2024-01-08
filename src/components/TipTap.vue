<template>
  <div v-if="editor">
    <button @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" >
      <i class="fas fa-bold width"></i> 
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      <i class="fas fa-italic width"></i> 
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      <i class="fa-solid fa-strikethrough width"></i>
    </button>
    <button @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
      <i class="fa-solid fa-code width"></i>
    </button>
    <!-- <button @click="editor.chain().focus().unsetAllMarks().run()" class="width">
      clear marks
    </button>
    <button @click="editor.chain().focus().clearNodes().run()" class="width">
      clear nodes
    </button> -->
    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
      <i class="fa-solid fa-paragraph width"></i>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 })} "
      style="font-weight: bold;" class="width">
      H1
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      style="font-weight: bold;" class="width">
      H2
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      style="font-weight: bold;" class="width">
      H3
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      style="font-weight: bold;" class="width">
      H4
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      style="font-weight: bold;" class="width">
      H5
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      style="font-weight: bold;" class="width">
      H6
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }">
      <i class="fa-solid fa-list width"></i>
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
      style="font-weight: bold;" class="width">
      ordered list
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
      style="font-weight: bold;" class="width">
      code block
    </button>
    <!-- <button @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
      style="font-weight: bold;" class="width">
      blockquote
    </button> -->
    <button @click="editor.chain().focus().setHorizontalRule().run()"
    style="font-weight: bold;" class="width">
      horizontal rule
    </button>
    <!-- <button @click="editor.chain().focus().setHardBreak().run()"
    style="font-weight: bold; " class="width">
      hard break
    </button> -->
    <!-- <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()" style="font-weight: bold;" class="width">
      undo
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()" style="font-weight: bold;" class="width">
      redo
    </button> -->
    <v-divider ></v-divider>
    <editor-content :editor="editor"  v-model="content" />
    
  </div>
  
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-2'

export default {
  components: {
    EditorContent,
  },
  
  data() {
    return {
      editor: null,
      content:'클릭하여 팟을 소개해주세요',
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
      ],
      content: this.content,
      onUpdate: ({editor}) => {
        this.content=editor.getHTML()
      },
    })
  },


  beforeUnmount() {
    this.editor.destroy()
  }
}
</script>

<style lang="scss" scoped>
/* Basic editor styles */
button {
  padding: 3px;
  text-align: center;
  text-decoration: none;
  border: 1.5px solid ; /* 테두리 스타일 및 색상 지정 */
  border-radius: 5px; /* 테두리의 모서리를 둥글게 만듭니다. */
  margin-right: 5px;
  margin-bottom: 10px;
}

.tiptap {
  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}</style>