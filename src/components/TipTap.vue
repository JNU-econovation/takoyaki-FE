<template>
  <div v-if="editor">

    <button
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      @click="editor.chain().focus().toggleBold().run()"
    >
      <i class="fas fa-bold width" /> 
    </button>

    <button
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      <i class="fas fa-italic width" /> 
    </button>

    <button
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      @click="editor.chain().focus().toggleStrike().run()"
    >
      <i class="fa-solid fa-strikethrough width" />
    </button>

    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      style="font-weight: bold;"
      class="width"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      H2
    </button>

    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      style="font-weight: bold;"
      class="width"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      H4
    </button>
  
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      style="font-weight: bold;"
      class="width"
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
    >
      H6
    </button>

    <button
      :class="{ 'is-active': editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      <i class="fa-solid fa-list width" />
    </button>

    <button
      style="font-weight: bold;"
      class="width"
      @click="editor.chain().focus().setHorizontalRule().run()"
    >
      구분선
    </button>

    <v-divider/>
    
    <editor-content
      v-model="content"
      :editor="editor"
      
    />

    <v-spacer />
    <v-btn
      style="border: none; width: 60%;"
      @click="sendContent"
    >
      팟 등록
    </v-btn>
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
      content:'',

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
  },
  methods: {
    sendContent() {
      this.$emit('input',this.content);
    },
    b() {
      console.log(this.content);
    }
  }
}
</script>

<style lang="scss" scoped>
/* Basic editor styles */
button {
  padding: 5px;
  padding-left: 15px;
  padding-right:15px;
  text-align: center;
  text-decoration: none;
  border: 2px solid #f1f1f1 ; /* 테두리 스타일 및 색상 지정 */
  background-color: #f7f7f7;
  border-radius: 5px; /* 테두리의 모서리를 둥글게 만듭니다. */

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

}
</style>
