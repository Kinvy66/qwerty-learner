import { useAtomValue } from 'jotai'
import { FormEvent, useMemo } from 'react'
import { currentDictInfoAtom } from '@/store'
import KeyEventHandler from '../KeyEventHandler'
import TextAreaHandler from '../TextAreaHandler'
import KeyEventHandlerDE from '../KeyEventHandlerDE'

export default function InputHandler({ updateInput }: { updateInput: (updateObj: WordUpdateAction) => void }) {
  const dictInfo = useAtomValue(currentDictInfoAtom)

  const handler = useMemo(() => {
    switch (dictInfo.language) {
      case 'en':
        return <KeyEventHandler updateInput={updateInput} />
      case 'de':
        return <KeyEventHandlerDE updateInput={updateInput} />
      case 'romaji':
        return <KeyEventHandler updateInput={updateInput} />
      case 'code':
        return <TextAreaHandler updateInput={updateInput} />
      default:
        return <TextAreaHandler updateInput={updateInput} />
    }
  }, [dictInfo.language, updateInput])

  return <>{handler}</>
}
export type WordUpdateAction = WordAddAction | WordDeleteAction | WordCompositionAction

export type WordAddAction = {
  type: 'add'
  value: string
  event: FormEvent<HTMLTextAreaElement> | KeyboardEvent
}

export type WordDeleteAction = {
  type: 'delete'
  length: number
}

// composition api is not ready yet
export type WordCompositionAction = {
  type: 'composition'
  value: string
}
