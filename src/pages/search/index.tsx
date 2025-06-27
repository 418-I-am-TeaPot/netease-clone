import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Search () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='search'>
      <Text>Hello world!</Text>
    </View>
  )
}
