import { Stack, StackInfo } from 'config/stack'
import React, { useCallback } from 'react'

interface StackListProps {
  stack: Stack[]
}

function StackList(props: StackListProps): React.ReactElement {
  const { stack } = props

  const renderList = useCallback((stack: Stack) => {
    const { value } = StackInfo[stack]

    return (
      <span
        className="mb-2 mr-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 font-display text-xs font-semibold text-gray-600 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
        key={stack}
      >
        {value}
      </span>
    )
  }, [])

  return <div className="flex flex-wrap gap-1">{React.Children.toArray(stack.map(renderList))}</div>
}

export default StackList
