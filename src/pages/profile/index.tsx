import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Profile () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='profile'>
      <Text>Hello world!</Text>
    </View>
  )
}
