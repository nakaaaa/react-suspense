import React, { Suspense } from 'react';
import './App.css'


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type Props = {
  name: string;
}
const RenderingNotifier: React.FC<Props> = ({ name }) => {
  console.log(`${name} is rendered`);

  return null
}

async function fetchData(): Promise<string> {
  await sleep(1000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`
}

const DataLoader: React.VFC = () => {
  const data = useData("DataLoader1", fetchData);
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  )
}

const DataLoader2: React.VFC = () => {
  const data = useData("DataLoader2", fetchData);
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  )
}

const dataMap: Map<string, unknown> = new Map();

function useData<T>(cacheKey: string, fetch: () => Promise<T>): T {
  const cachedData = dataMap.get(cacheKey) as T | undefined;
  if (cachedData === undefined) {
    throw fetch().then((d) => dataMap.set(cacheKey, d,));
  }
  return cachedData;
}


function App() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl">React App!</h1>
        <RenderingNotifier name="outside-Suspense" />
        <Suspense fallback={<p>Loading...</p>}>
          <DataLoader />
          <DataLoader2 />
        </Suspense>
      </div>
    </>
  )
}

export default App
