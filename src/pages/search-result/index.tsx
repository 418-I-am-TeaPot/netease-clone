import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function SearchResult () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='search-result'>
      <Text>Hello world!</Text>
    </View>
  )
}
