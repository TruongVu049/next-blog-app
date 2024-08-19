const Loading = () => {
  return (
    <main className="max-w-screen-xl block mx-auto px-3 mt-4 h-auto min-h-[1000px]">
      <div className="flex md:flex-row flex-col gap-5 relative">
        <div className="md:flex-[1_1_70%] w-full  rounded-md">
          <div className="px-3">
            <div className="my-5  h-16 w-full overflow-hidden rounded nimate-pulse bg-gray-200"></div>
          </div>
          <div className="overflow-hidden mx-3">
            <div className="w-full  flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full nimate-pulse bg-gray-200"></div>
                <div className="flex flex-col justify-between">
                  <div className="h-8 w-16 rounded nimate-pulse bg-gray-200"></div>
                  <div className="h-5 mt-1 w-28 rounded nimate-pulse bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 mb-2 px-3">
            <div className="flex items-center justify-between">
              <div className="w-24 h-6 rounded nimate-pulse bg-gray-200"></div>
              <div className="h-6 w-32 rounded nimate-pulse bg-gray-200"></div>
            </div>
          </div>
          <div className="px-3 mt-2">
            <div className="h-32 w-full rounded nimate-pulse bg-gray-200"></div>
            <div className="h-44 w-full rounded nimate-pulse bg-gray-200"></div>
          </div>
        </div>
        <div className="w-1 hidden md:block border-r border-neutral-200"></div>
        <div className="relative  top-2 left-0 right-0 md:w-64 lg:w-72 "></div>
      </div>
    </main>
  );
};

export default Loading;
