import { component$, useVisibleTask$ } from '@builder.io/qwik'


export const Canvas = component$(() => {
  console.log(":(")

  useVisibleTask$(() => {
    console.log("??useTask")
  })


  return (
    <div>
      <div>test?</div>
    </div>
  )
})