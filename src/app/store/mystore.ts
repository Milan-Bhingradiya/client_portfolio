import { create } from 'zustand'

export const mystore = create((set) => ({
    ballShouldFollow: "kpi",
    ballSize:{
      width: 100,
      height: 100,
    },
    setballSize: (size:{width:number, height:number}) => set({ ballSize: size }),
 
  setballShouldFollow: (name:string) => set({ ballShouldFollow: name }),
}))