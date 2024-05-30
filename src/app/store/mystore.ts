import { create } from 'zustand'

export const mystore = create((set) => ({
    ballVisible: true,
    ballShouldFollow: "kpi",
    ballSize:{
      width: 100,
      height: 100,
    },
    setballSize: (size:{width:number, height:number}) => set({ ballSize: size }),
    setballVisible: (bool:any) => set({ ballVisible: bool }),

 
  setballShouldFollow: (name:string) => set({ ballShouldFollow: name }),

  // title design ,tech,business che eni left side static color should see or not var
    staticTitleBallVisible: false,
    setstaticTitleBallVisible: (bool:any) => set({ staticTitleBallVisible: bool }),
}))