import Head from 'next/head'

const Home = () => {
  return (
    <div className='font-mono'>
      <div className='bg-white'>
        <div className='relative mx-12'>
          <img src='lsd_logo.jpg' className='h-20 pr-12 py-2 inline-block'></img>
          <div className='inline-block text-3xl align-middle'>MULTI</div>
          <a className="absolute right-0 top-5" href='https://github.com/hagerondev/LSD-Stream'>
            <div className='inline-block text-2xl align-middle font-bold border rounded-full border-black aspect-square w-8 text-center bg-gray-100'>？</div>
          </a>
        </div>
      </div>
      <div id='main' className='flex flex-row p-8'>
        <div className='basis-3/4'>
          <div id='left'>
            <iframe src='hls.html' className='w-[88%] aspect-video mx-auto'></iframe>
          </div>
        </div>
        <div id='right' className='basis-1/4'>
          <div id='chat' className='bg-white mr-10 h-full rounded-lg border flex flex-col'>
            <h1 className='p-4 text-2xl font-bold'>チャット</h1>
            <div id='history' className='bg-[#f9f9f9] h-full'>
              <div className='mx-4 py-1 border-b'>
                <div className='inline-block text-xl mx-2'>name</div>
                <div className='inline-block text-sm mx-2'>19:35</div>
                <div className='inline-block mx-2 text-xl'>content</div>
              </div>
              <div className='px-4 py-1'>
                <div className='inline-block text-xl mx-2'>name</div>
                <div className='inline-block text-sm mx-2'>19:35</div>
                <div className='inline-block mx-2 text-xl'>content</div>
              </div>
              <div className='px-4 py-1'>
                <div className='inline-block text-xl mx-2'>name</div>
                <div className='inline-block text-sm mx-2'>19:35</div>
                <div className='inline-block mx-2 text-xl'>content</div>
              </div>
              <div className='px-4 py-1'>
                <div className='inline-block text-xl mx-2'>name</div>
                <div className='inline-block text-sm mx-2'>19:35</div>
                <div className='inline-block mx-2 text-xl'>content</div>
              </div>
            </div>
            <div className='bg-white basis-1/5 p-4'>
              <input placeholder='name' className='border-b text-lg'></input><br />
              <input placeholder='最高！' className='border-b text-xl my-3'></input>
              <div id='chat-buttons'>
                <button className=' border rounded-md px-8 bg-[#f9f9f9] mx-4 text-xl'>送信</button>
                <button className='text-red-600 border rounded-md px-8 bg-[#f9f9f9] mx-4 text-xl'>❤</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
