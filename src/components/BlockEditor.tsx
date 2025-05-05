// src/components/BlockEditor.tsx
import React, { useEffect, useRef, useState } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import ImageTool from '@editorjs/image'
import { supabase } from '@/lib/supabase'
import { IconImage, IconList, IconH1, IconTable, IconVideo } from 'lucide-react'

export function BlockEditor({ onChange }: { onChange: (data: OutputData) => void }) {
  const ejInstance = useRef<EditorJS>()
  const holderId = 'editorjs'

  useEffect(() => {
    if (!ejInstance.current) {
      const editor = new EditorJS({
        holder: holderId,
        placeholder: 'Start writing your post…',
        tools: {
          header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            inlineToolbar: true,
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const ext = file.name.split('.').pop()
                  const fileName = `post-images/${Date.now()}.${ext}`
                  const { data, error } = await supabase
                    .storage
                    .from('blog-images')
                    .upload(fileName, file)

                  if (error) throw error
                  const { publicURL } = supabase
                    .storage
                    .from('blog-images')
                    .getPublicUrl(fileName)

                  return { success: 1, file: { url: publicURL! } }
                }
              }
            }
          },
          paragraph: {
            class: require('@editorjs/paragraph'),
          }
        },
        onChange: async () => {
          const data = await editor.save()
          onChange(data)
        }
      })
      ejInstance.current = editor
    }

    return () => {
      ejInstance.current?.destroy()
      ejInstance.current = undefined
    }
  }, [])

  // Optional: custom sidebar buttons to insert blocks programmatically
  const insertBlock = (tool: string) => {
    ejInstance.current?.blocks.insert(tool, {}, {}, ejInstance.current.blocks.getBlocksCount(), true)
  }

  return (
    <div className="flex h-full">
      {/* ← Left rail */}
      <aside className="flex flex-col items-center bg-gray-100 p-2 space-y-3 rounded-l-lg">
        <button onClick={() => insertBlock('header')} className="hover:bg-gray-200 p-2 rounded">
          <IconH1 size={20}/>
        </button>
        <button onClick={() => insertBlock('list')} className="hover:bg-gray-200 p-2 rounded">
          <IconList size={20}/>
        </button>
        <button onClick={() => insertBlock('image')} className="hover:bg-gray-200 p-2 rounded">
          <IconImage size={20}/>
        </button>
        <button onClick={() => insertBlock('embed')} className="hover:bg-gray-200 p-2 rounded">
          <IconVideo size={20}/>
        </button>
        <button onClick={() => insertBlock('table')} className="hover:bg-gray-200 p-2 rounded">
          <IconTable size={20}/>
        </button>
      </aside>

      {/* ← Main editor area */}
      <div id={holderId} className="flex-1 bg-white rounded-r-lg overflow-auto p-6" />
    </div>
  )
}
