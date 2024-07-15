import React, {useEffect, useState,Profiler} from 'react'
import axios from "axios";
import { FixedSizeList as List } from 'react-window';

function About() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      debugger
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setList(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
    }
  };

  useEffect(() => {
    fetchList();
    console.log(list)
  }, []);

  const Row = ({ index, style }) => (
    <div key={list[index].id} style={style} className="list-item">
      <h3>{list[index].title}</h3>
      <p>{list[index].body}</p>
    </div>
  );

  // Profiler code
  const callback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    console.log(`Profiler ID: ${id}`);
    console.log(`Phase: ${phase}`);
    console.log(`Actual Duration: ${actualDuration}`);
    console.log(`Base Duration: ${baseDuration}`);
    console.log(`Start Time: ${startTime}`);
    console.log(`Commit Time: ${commitTime}`);
    console.log('Interactions:', interactions);
    console.log('-------------------------------------');
  };
  // Profiler code

  return (
    <Profiler id="myProfiler" onRender={callback}>

    About
      <h1>React Virtualized Window</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <List
        height={600} // Height of the list container
        itemCount={list.length} // Total number of items
        itemSize={100} // Height of each item
        width={'100%'} // Width of the list container
      >
        {Row}
      </List>
      )}
    </Profiler>
  )
}

export default About