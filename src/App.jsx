import React, { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length,setLength]=useState(8);
  const [numAllowed,setnumAllowed]=useState(false);
  const [charAllowed,setcharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  //UseRef hook
  const passwordRef=useRef(null);

  let passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$^&*(){}?<>`[]";

    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
    
  },[length,numAllowed,charAllowed,setPassword]);

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator]);

  const copyPasswordtoClipBoard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);

  return (
    <div className="mx-auto my-10 max-w-md sm:w-11/12 md:w-3/4 lg:w-1/2 border border-gray-300 p-6 rounded-lg bg-gray-800 text-white shadow-lg">
    <h1 className="text-3xl font-bold text-orange-400 text-center mb-6">
      Password Generator
    </h1>
  
    {/* Password Display and Copy */}
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={password}
          placeholder="Generated Password"
          className="border border-gray-400 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-700 text-white"
          readOnly
          ref={passwordRef}
        />
        <button
          className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 transition"
          onClick={copyPasswordtoClipBoard}
        >
          Copy
        </button>
      </div>
    </div>
  
    {/* Length Slider */}
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <label className="font-semibold">Length ({length})</label>
        <input
          type="range"
          min={8}
          max={100}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-3/4 cursor-pointer"
        />
      </div>
    </div>
  
    {/* Options */}
    <div className="mt-6 grid grid-cols-2 gap-4">
      {/* Numbers Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="numberInput"
          defaultChecked={numAllowed}
          onChange={() => setnumAllowed((prev) => !prev)}
          className="w-5 h-5 cursor-pointer"
        />
        <label htmlFor="numberInput" className="font-semibold">
          Include Numbers
        </label>
      </div>
  
      {/* Characters Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="characterInput"
          defaultChecked={charAllowed}
          onChange={() => setcharAllowed((prev) => !prev)}
          className="w-5 h-5 cursor-pointer"
        />
        <label htmlFor="characterInput" className="font-semibold">
          Include Characters
        </label>
      </div>
    </div>
  </div>
  
  )
}

export default App

