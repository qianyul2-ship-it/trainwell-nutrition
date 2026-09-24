import { useState, useRef, useEffect } from "react";

const T={p04:"#443564",p01:"#F4F2F8",p02:"#DDD7EA",n01:"#fff",n02:"#F6F6F6",n03:"#E9E9E9",n04:"#DEDEDE",n05:"#A8A8A8",n06:"#767676",n08:"#252525",s01:"#F0FAF4",s02:"#C1EBD4",s03:"#379764",e03:"#EC4835",e01:"#FEF2F2",nut:"#B3E5B6",or:"#FF6033",hg:"#C8EDC8",red:"#DC2626"};

const SB=()=><div style={{height:44,display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"0 24px 6px",fontSize:15,fontWeight:600,flexShrink:0}}><span>9:41</span><span style={{fontSize:12}}>●●● ⟡ ▮</span></div>;
const HI=()=><div style={{height:34,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:8,flexShrink:0}}><div style={{width:134,height:5,background:"black",borderRadius:100}}/></div>;
const Btn=({children,onClick,s})=><button onClick={onClick} style={{width:"100%",padding:"14px 24px",background:T.p04,color:"white",border:"none",borderRadius:8,fontSize:17,fontWeight:700,cursor:"pointer",fontFamily:"inherit",...s}}>{children}</button>;
const Ch=()=><span style={{color:T.n05,fontSize:20}}>›</span>;
const Card=({children,s,onClick})=><div onClick={onClick} style={{border:`1px solid ${T.n03}`,borderRadius:8,padding:12,background:"white",cursor:onClick?"pointer":"default",...s}}>{children}</div>;
const Back=({onClick})=><span onClick={onClick} style={{fontSize:24,color:T.n06,cursor:"pointer"}}>‹</span>;
const Nav=({left,title,right})=><div style={{display:"flex",alignItems:"center",padding:"8px 16px",flexShrink:0}}>{left||<span style={{width:24}}/>}<span style={{flex:1,textAlign:"center",fontSize:17,fontWeight:700}}>{title}</span>{right||<span style={{width:24}}/>}</div>;
const Bar=({l,w,c,t})=><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{width:64,fontSize:12,fontWeight:500,color:T.n06,textAlign:"right"}}>{l}</span><div style={{flex:1,height:20,background:T.n02,borderRadius:4,overflow:"hidden"}}><div style={{width:`${w}%`,height:"100%",background:c,borderRadius:4,display:"flex",alignItems:"center",paddingLeft:6,fontSize:11,fontWeight:600,color:"white"}}>{t}</div></div></div>;
const Tag=({t,bg,c})=><span style={{display:"inline-flex",padding:"4px 10px",borderRadius:6,fontSize:12,fontWeight:500,background:bg,color:c,margin:2}}>{t}</span>;
const emojis=["😫","😕","😐","🙂","😄"];

// ═══ NOTIFICATION POPUP ═══
const nudgeMessages={
  "Finish last meal before 9:00 PM":[
    {title:"Evening check-in",body:"You're staying on track with your no-food-after-9 goal tonight. {streak} day streak!",time:"8:30 PM"},
    {title:"Streak alert",body:"You're staying on track with your no-food-after-9 goal tonight. Keep it going — {streak} days strong!",time:"8:45 PM"},
    {title:"Almost there",body:"You're staying on track with your no-food-after-9 goal tonight. Almost there!",time:"8:50 PM"},
  ],
  "One fist of protein per meal":[
    {title:"Meal time",body:"About to eat? Remember: one fist of protein. Chicken, eggs, yogurt, tofu — pick one! {streak} day streak.",time:"12:00 PM"},
    {title:"Protein check",body:"Quick reminder before your meal: add a fist-sized portion of protein. Your training recovery will thank you!",time:"6:30 PM"},
  ],
  "Eat before going out":[
    {title:"Going out tonight?",body:"Going out tonight? Eating beforehand can help. {streak} day streak!",time:"6:00 PM"},
    {title:"Pre-outing reminder",body:"Going out tonight? Eating beforehand can help. A solid meal now keeps you on track later.",time:"5:30 PM"},
  ],
};
const NotifPopup=({commitment,streak,onTap,onDismiss})=>{
  const msgs=nudgeMessages[commitment]||nudgeMessages["Finish last meal before 9:00 PM"];
  const msg=msgs[Math.floor(Math.random()*msgs.length)];
  const body=msg.body.replace("{streak}",String(streak));
  return <div style={{position:"absolute",top:50,left:12,right:12,zIndex:100,animation:"slideDown 0.3s ease-out"}} onClick={onTap}>
    <div style={{background:"rgba(255,255,255,0.97)",borderRadius:16,padding:"12px 16px",boxShadow:"0 8px 30px rgba(0,0,0,0.15)",border:`1px solid ${T.n03}`,backdropFilter:"blur(20px)"}}>
      <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
        <div style={{width:36,height:36,borderRadius:8,background:T.p04,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:16,color:"white",fontWeight:700}}>tw</span></div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
            <span style={{fontSize:13,fontWeight:700}}>trainwell</span>
            <span style={{fontSize:11,color:T.n06}}>{msg.time}</span>
          </div>
          <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{msg.title}</div>
          <div style={{fontSize:13,color:T.n06,lineHeight:"18px"}}>{body}</div>
        </div>
      </div>
    </div>
  </div>;
};

const TabBar=({a,onTab})=>{
  const tabs=[{id:"today",i:"☀",l:"Today"},{id:"teams",i:"👥",l:"Teams"},{id:"workouts",i:"🏋",l:"Workouts"},{id:"progress",i:"📈",l:"Progress"},{id:"chat",i:"💬",l:"Chat"}];
  return <div style={{height:54,background:"white",boxShadow:`0 -1px 0 0 ${T.n03}`,display:"flex",alignItems:"flex-start",justifyContent:"space-around",paddingTop:6,flexShrink:0}}>
    {tabs.map(t=><div key={t.id} onClick={()=>onTab(t.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"4px 10px",borderRadius:20,background:a===t.id?T.n02:"transparent"}}>
      <span style={{fontSize:18}}>{t.i}</span><span style={{fontSize:11,fontWeight:500,color:a===t.id?T.p04:T.n06}}>{t.l}</span>
    </div>)}
  </div>;
};

// ═══ GOAL SELECTION (before onboarding) ═══
const GoalSelect=({onSelect})=><div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
  <SB/>
  <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 24px"}}>
    <div style={{fontSize:24,fontWeight:700,textAlign:"center",marginBottom:8}}>What's your primary goal?</div>
    <div style={{fontSize:14,color:T.n06,textAlign:"center",marginBottom:32}}>This helps your trainer personalize your nutrition plan.</div>
    <Card onClick={()=>onSelect("lose_weight")} s={{marginBottom:12,padding:20,border:`1.5px solid ${T.p02}`,cursor:"pointer"}}>
      <div style={{fontSize:28,marginBottom:8}}>⚖️</div>
      <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Lose Weight</div>
      <div style={{fontSize:14,color:T.n06}}>Focus on building sustainable eating habits that support fat loss while maintaining energy.</div>
    </Card>
    <Card onClick={()=>onSelect("energetic")} s={{padding:20,border:`1px solid ${T.n03}`,cursor:"pointer"}}>
      <div style={{fontSize:28,marginBottom:8}}>⚡</div>
      <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Feel More Energetic</div>
      <div style={{fontSize:14,color:T.n06}}>Focus on meal timing, nutrient balance, and fueling your training for better performance.</div>
    </Card>
  </div><HI/>
</div>;

// ═══ ONBOARDING ═══
const Onboarding=({onDone})=>{
  const [p,setP]=useState(0);
  const pgs=[
    {i:"🥗",t:"Welcome to Food Awareness",b:"One week understanding your eating patterns. No calorie counting.",s:"Your trainer will use this to build your plan."},
    {i:"📸",t:"Log Meals Your Way",b:"Photo, voice note, or text — plus a quick energy & hunger check-in each time.",s:"Log whenever you eat. No structure needed."},
    {i:"📊",t:"Your Patterns, Revealed",b:"Every 5 logs, your data surfaces meal timing trends, energy correlations, and eating behavior patterns.",s:"Behavior-focused insights, not calorie counting."},
    {i:"🤝",t:"Coach Picks Your Commitment",b:"Schedule a call with your trainer to review insights together. They'll pick one sustainable commitment for you.",s:"Your trainer makes the call based on what works for you."},
    {i:"✅",t:"Build Your Habit",b:"Check it off daily, rate your energy, track your progress. After 5 check-ins, see how it's working!",s:"Then choose: continue, switch, add on, or talk to your trainer."},
  ];
  const pg=pgs[p];
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
    <SB/><div style={{padding:"0 16px",display:"flex",justifyContent:"flex-end"}}><button onClick={onDone} style={{background:"none",border:"none",fontSize:15,color:T.n06,cursor:"pointer",padding:8,fontFamily:"inherit"}}>Skip</button></div>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 28px"}}>
      <div style={{fontSize:64,marginBottom:20,textAlign:"center"}}>{pg.i}</div>
      <div style={{fontSize:24,fontWeight:700,lineHeight:"32px",marginBottom:12,textAlign:"center"}}>{pg.t}</div>
      <div style={{fontSize:16,fontWeight:450,lineHeight:"24px",textAlign:"center",marginBottom:8}}>{pg.b}</div>
      <div style={{fontSize:14,lineHeight:"20px",color:T.n06,textAlign:"center"}}>{pg.s}</div>
    </div>
    <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:16}}>{pgs.map((_,i)=><div key={i} style={{width:i===p?24:8,height:8,borderRadius:4,background:i===p?T.p04:T.n03,transition:"all .3s"}}/>)}</div>
    <div style={{padding:"0 16px 24px"}}>{p<pgs.length-1?<Btn onClick={()=>setP(p+1)}>Continue</Btn>:<Btn onClick={onDone}>Get Started</Btn>}
    {p>0&&<div style={{textAlign:"center"}}><button onClick={()=>setP(p-1)} style={{background:"none",border:"none",fontSize:15,color:T.n06,cursor:"pointer",padding:12,fontFamily:"inherit"}}>Back</button></div>}</div><HI/>
  </div>;
};

// ═══ MEAL LOGGER (with time + energy + hunger) ═══
const MealLogger=({onSave,onClose,cnt})=>{
  const [photo,setPhoto]=useState(false);const [note,setNote]=useState("");const [energy,setEnergy]=useState(-1);const [hunger,setHunger]=useState(-1);const [rec,setRec]=useState(false);
  const now=new Date();const pad=n=>String(n).padStart(2,"0");
  const [hour,setHour]=useState(now.getHours());const [min,setMin]=useState(Math.floor(now.getMinutes()/5)*5);
  const canSave=(photo||note)&&energy>=0&&hunger>=0;
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
    <SB/><Nav left={<Back onClick={onClose}/>} title="Log a Meal"/>
    <div style={{flex:1,padding:"0 16px",overflowY:"auto"}}>
      <div style={{textAlign:"center",padding:"8px 0 4px"}}><div style={{fontSize:13,fontWeight:600,color:T.s03}}>Meal #{cnt+1} today</div></div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:12}}>
        <span style={{fontSize:14,color:T.n06}}>🕐</span>
        <input type="time" value={`${pad(hour)}:${pad(min)}`} onChange={e=>{const[h,m]=e.target.value.split(":");setHour(+h);setMin(+m);}} style={{border:`1px solid ${T.n04}`,borderRadius:8,padding:"6px 12px",fontSize:15,fontWeight:600,fontFamily:"inherit",color:T.n08,textAlign:"center",outline:"none",background:"white"}}/>
        <span style={{fontSize:12,color:T.n05}}>auto-filled</span>
      </div>
      {photo?<div style={{width:"100%",height:130,borderRadius:12,background:"linear-gradient(135deg,#E8F5E9,#C8E6C9)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4,marginBottom:12}}>
        <span style={{fontSize:28}}>🍽️</span><span style={{color:T.s03,fontWeight:600,fontSize:14}}>Photo added</span><button onClick={()=>setPhoto(false)} style={{background:"none",border:"none",fontSize:12,color:T.n06,cursor:"pointer",textDecoration:"underline"}}>Remove</button>
      </div>:<div onClick={()=>setPhoto(true)} style={{width:"100%",height:130,border:`2px dashed ${T.n04}`,borderRadius:12,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,cursor:"pointer",marginBottom:12,color:T.n05}}>
        <span style={{fontSize:28}}>📸</span><span style={{fontSize:14,fontWeight:500}}>Tap to add a photo</span></div>}
      <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Describe what you ate..." rows={2} style={{width:"100%",padding:10,border:`1px solid ${T.n04}`,borderRadius:8,fontSize:14,fontFamily:"inherit",resize:"none",outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
        <button onClick={()=>{setRec(!rec);if(!rec)setTimeout(()=>{setRec(false);setNote(n=>n+(n?"\n":"")+"🎤 Voice note")},1200);}} style={{width:44,height:44,borderRadius:22,background:rec?T.e03:T.p01,border:`2px solid ${rec?T.e03:T.p02}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer"}}>{rec?"⏹":"🎤"}</button>
      </div>
      <div style={{background:T.n02,borderRadius:8,padding:12,marginBottom:8}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>How's your energy right now?</div>
        <div style={{display:"flex",justifyContent:"space-between"}}>{emojis.map((e,i)=><div key={i} onClick={()=>setEnergy(i)} style={{width:44,height:44,borderRadius:22,background:energy===i?T.p04:"white",border:`2px solid ${energy===i?T.p04:T.n03}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,cursor:"pointer"}}>{e}</div>)}</div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.n06,marginTop:4,padding:"0 4px"}}><span>Low</span><span>High</span></div>
      </div>
      <div style={{background:T.n02,borderRadius:8,padding:12,marginBottom:8}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>How hungry were you?</div>
        <div style={{display:"flex",justifyContent:"space-between"}}>{["😌","🙂","😐","😋","🤤"].map((e,i)=><div key={i} onClick={()=>setHunger(i)} style={{width:44,height:44,borderRadius:22,background:hunger===i?T.p04:"white",border:`2px solid ${hunger===i?T.p04:T.n03}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,cursor:"pointer"}}>{e}</div>)}</div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.n06,marginTop:4,padding:"0 4px"}}><span>Not at all</span><span>Starving</span></div>
      </div>
    </div>
    <div style={{padding:12,flexShrink:0}}><Btn onClick={()=>canSave&&onSave()} s={{opacity:canSave?1:0.4}}>Save Meal Log</Btn></div><HI/>
  </div>;
};

// ═══ HABIT DETAIL (green + red states, swipe up/down) ═══
const HabitDetail=({habit,done,onDo,onMiss,onClose})=>{
  const [energy,setEnergy]=useState(-1);
  // Green completed screen
  if(done)return <div style={{display:"flex",flexDirection:"column",height:"100%",background:T.hg}}>
    <SB/><div style={{display:"flex",justifyContent:"flex-end",padding:"8px 16px"}}><button onClick={onClose} style={{background:"none",border:"none",fontSize:15,fontWeight:600,color:T.p04,cursor:"pointer",fontFamily:"inherit"}}>Save & Exit</button></div>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 24px"}}>
      <div style={{display:"inline-flex",alignSelf:"flex-start",background:"white",borderRadius:16,padding:"6px 14px",fontSize:14,fontWeight:600,marginBottom:12}}>Nutrition</div>
      <div style={{fontSize:26,fontWeight:700,lineHeight:"34px",marginBottom:16}}>{habit}</div>
      <div style={{background:"rgba(255,255,255,0.4)",borderRadius:12,padding:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:28,height:28,borderRadius:14,background:T.s03,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✓</div><span style={{fontSize:17,fontWeight:600}}>Completed Today</span></div>
      </div>
    </div><HI/>
  </div>;
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:T.hg}}>
    <SB/>
    {/* Save & Exit top right */}
    <div style={{display:"flex",justifyContent:"flex-end",padding:"0 16px"}}>
      <button onClick={onClose} style={{background:"none",border:"none",fontSize:15,fontWeight:600,color:T.p04,cursor:"pointer",fontFamily:"inherit"}}>Save & Exit</button>
    </div>
    {/* Swipe DOWN visual at top center = I didn't make it */}
    <div onClick={()=>onMiss()} style={{textAlign:"center",cursor:"pointer",padding:"4px 0 8px"}}>
      <div style={{fontSize:20}}>⌄</div>
      <div style={{fontSize:15,fontWeight:500,color:T.n06}}>I didn't make it</div>
    </div>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 24px"}}>
      <div style={{display:"inline-flex",alignSelf:"flex-start",background:"white",borderRadius:16,padding:"6px 14px",fontSize:14,fontWeight:600,marginBottom:12}}>Nutrition</div>
      <div style={{fontSize:26,fontWeight:700,lineHeight:"34px",marginBottom:16}}>{habit}</div>
      <div style={{background:"rgba(255,255,255,0.4)",borderRadius:12,padding:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><span style={{fontSize:18}}>📅</span><span style={{fontSize:17,fontWeight:600}}>Scheduled for Today</span></div>
        <textarea placeholder="Write a note..." rows={2} style={{width:"100%",padding:10,border:"none",borderRadius:8,fontSize:14,fontFamily:"inherit",resize:"none",outline:"none",boxSizing:"border-box",background:"white",marginBottom:12}}/>
        <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>How's your energy today?</div>
        <div style={{display:"flex",justifyContent:"space-between",gap:4}}>
          {emojis.map((e,i)=><div key={i} onClick={()=>setEnergy(i)} style={{flex:1,height:40,borderRadius:8,background:energy===i?"white":"rgba(255,255,255,0.3)",border:energy===i?`2px solid ${T.s03}`:"2px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,cursor:"pointer"}}>{e}</div>)}
        </div>
      </div>
    </div>
    {/* Swipe UP visual at bottom = I did it */}
    <div onClick={()=>{if(energy>=0)onDo(energy);}} style={{textAlign:"center",padding:"12px 0 8px",cursor:"pointer",opacity:energy>=0?1:0.4}}>
      <div style={{fontSize:17,fontWeight:700}}>I did it!</div>
      <div style={{fontSize:20}}>⌃</div>
    </div><HI/>
  </div>;
};

// ═══ THANK YOU PAGE (replaces Eating Insights for user-facing) ═══
const ThankYou=({onSchedule,onClose})=><div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
  <SB/><Nav left={<Back onClick={onClose}/>} title="Food Awareness Complete"/>
  <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"0 32px"}}>
    <div style={{fontSize:64,marginBottom:20}}>🎉</div>
    <div style={{fontSize:24,fontWeight:700,textAlign:"center",marginBottom:12}}>Thank you for completing your Food Awareness Week!</div>
    <div style={{fontSize:16,color:T.n06,textAlign:"center",lineHeight:"24px",marginBottom:24}}>Your trainer will review your eating patterns and guide you on the best next steps.</div>
    <div style={{background:T.p01,borderRadius:12,padding:16,width:"100%",textAlign:"center",marginBottom:8}}>
      <div style={{fontSize:14,color:T.p04,lineHeight:"20px"}}>Your data has been shared with your trainer. Schedule a quick call to discuss your personalized plan.</div>
    </div>
  </div>
  <div style={{padding:"0 16px 24px"}}><Btn onClick={onSchedule}>Schedule Call with Trainer</Btn></div><HI/>
</div>;

// ═══ NUTRITION INSIGHT CARD (post-log instant reward) ═══
const insightPool=[
  "Great timing — eating earlier in the evening can support better recovery.",
  "Leafy greens like these are rich in iron, which supports energy during workouts.",
  "This meal looks balanced with carbs, protein, and fats — nice job.",
  "Foods like this can help keep you full longer.",
  "Eating consistently at similar times helps your body maintain steady energy.",
  "Protein-rich meals like this support muscle recovery after training.",
  "Colorful plates tend to have more diverse nutrients — looks like you're on track!",
  "Meals with fiber like this tend to keep you satisfied between meals.",
  "You might enjoy trying a similar meal with a different grain next week for variety.",
  "Eating a solid meal before heading out can help you stay on track later.",
];
const InsightCard=({onDone})=>{
  const insight=insightPool[Math.floor(Math.random()*insightPool.length)];
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
    <SB/><Nav title="Meal Logged!"/>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"0 24px"}}>
      <div style={{fontSize:48,marginBottom:16}}>✨</div>
      <div style={{fontSize:20,fontWeight:700,textAlign:"center",marginBottom:8,color:T.s03}}>Nice one!</div>
      <div style={{background:T.s01,border:`1px solid ${T.s02}`,borderRadius:16,padding:20,width:"100%"}}>
        <div style={{fontSize:12,fontWeight:700,color:T.s03,textTransform:"uppercase",letterSpacing:0.5,marginBottom:8}}>Nutrition Insight</div>
        <div style={{fontSize:16,lineHeight:"24px",color:T.n08}}>{insight}</div>
      </div>
      <div style={{fontSize:13,color:T.n06,marginTop:16,textAlign:"center"}}>Keep logging to help your trainer understand your patterns.</div>
    </div>
    <div style={{padding:"0 16px 24px"}}><Btn onClick={onDone}>Continue</Btn></div><HI/>
  </div>;
};

// ═══ COMMITMENT MODE CHOICE (binary vs quantitative) ═══
const CommitModeChoice=({onBinary,onQuantitative,onClose})=><div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
  <SB/><Nav left={<Back onClick={onClose}/>} title="Your Approach"/>
  <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 24px"}}>
    <div style={{fontSize:22,fontWeight:700,textAlign:"center",marginBottom:8}}>How would you like to approach nutrition?</div>
    <div style={{fontSize:14,color:T.n06,textAlign:"center",marginBottom:24}}>You can change this anytime in settings.</div>
    <Card onClick={onBinary} s={{marginBottom:12,border:`1.5px solid ${T.s02}`,cursor:"pointer",padding:20}}>
      <div style={{fontSize:20,marginBottom:8}}>🎯</div>
      <div style={{fontSize:17,fontWeight:700,marginBottom:4}}>Keep it simple with habits</div>
      <div style={{fontSize:14,color:T.n06,lineHeight:"20px"}}>Daily yes/no check-ins. "Did I eat before going out?" "Did I include protein at dinner?" No numbers, no tracking.</div>
      <div style={{marginTop:8,fontSize:12,color:T.s03,fontWeight:600}}>Recommended for most people</div>
    </Card>
    <Card onClick={onQuantitative} s={{marginBottom:12,border:`1px solid ${T.n03}`,cursor:"pointer",padding:20}}>
      <div style={{fontSize:20,marginBottom:8}}>📊</div>
      <div style={{fontSize:17,fontWeight:700,marginBottom:4}}>Use numbers and targets</div>
      <div style={{fontSize:14,color:T.n06,lineHeight:"20px"}}>Track protein grams, calorie ranges, or macro goals. For users who want more precision and data.</div>
      <div style={{marginTop:8,fontSize:12,color:T.n06}}>For advanced users</div>
    </Card>
  </div><HI/>
</div>;

// ═══ SCHEDULE CONFIRMATION ═══
const ScheduleConfirm=({onDone,onClose})=><div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
  <SB/><Nav left={<Back onClick={onClose}/>} title="Schedule Call"/>
  <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"0 32px"}}>
    <div style={{fontSize:64,marginBottom:16}}>📅</div>
    <div style={{fontSize:22,fontWeight:700,textAlign:"center",marginBottom:8}}>Call Scheduled!</div>
    <div style={{fontSize:15,color:T.n06,textAlign:"center",lineHeight:"22px",marginBottom:24}}>Gaby will review your insights and prepare commitment options.</div>
    <div style={{background:T.s01,border:`1px solid ${T.s02}`,borderRadius:12,padding:16,width:"100%",textAlign:"center"}}><div style={{fontSize:15,fontWeight:700}}>Thu, Mar 26 at 2:00 PM</div><div style={{fontSize:13,color:T.n06}}>30 min · Video call</div></div>
  </div>
  <div style={{padding:"0 16px 24px"}}><Btn onClick={onDone}>See Gaby's Recommendations</Btn></div><HI/>
</div>;

// ═══ COACH COMMITMENT ═══
const CoachCommit=({onAccept,onClose,mode="new",availableOpts=[]})=>{
  const [sel,setSel]=useState(0);
  const allOpts=[
    {e:"⏰",t:"Finish last meal before 9:00 PM",d:"Your data shows meals ending early = 23% higher energy.",why:"Based on your meal timing & energy patterns"},
    {e:"🥩",t:"One fist of protein per meal",d:"Your protein intake has been low. Would help training recovery.",why:"Based on your food logs & training load"},
    {e:"💧",t:"Eat before going out",d:"Going out on an empty stomach leads to overeating.",why:"Based on your eating patterns on social nights"},
  ];
  const opts=availableOpts.length>0?allOpts.filter(o=>availableOpts.includes(o.t)):allOpts;
  const titles={new:"Your Commitment",switch:"Switch Commitment",addon:"Add Commitment"};
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
    <SB/><Nav left={<Back onClick={onClose}/>} title={titles[mode]||"Your Commitment"}/>
    <div style={{flex:1,padding:"0 16px",overflowY:"auto"}}>
      <div style={{background:T.n02,borderRadius:16,padding:16,margin:"8px 0 16px"}}>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
          <div style={{width:40,height:40,borderRadius:20,background:T.p04,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:16}}>G</div>
          <div><div style={{fontSize:15,fontWeight:700}}>Gaby</div><div style={{fontSize:12,color:T.n06}}>Your Trainer</div></div>
        </div>
        <div style={{fontSize:15,lineHeight:"22px"}}>Based on our conversation and your data, here are my recommendations:</div>
      </div>
      <div style={{fontSize:12,fontWeight:700,color:T.n06,textTransform:"uppercase",letterSpacing:0.3,marginBottom:8}}>Recommended</div>
      {opts.map((o,i)=><div key={i}>
        {i===1&&<div style={{fontSize:12,fontWeight:700,color:T.n06,textTransform:"uppercase",letterSpacing:0.3,margin:"12px 0 8px"}}>Backup options</div>}
        <Card onClick={()=>setSel(i)} s={{marginBottom:8,border:`1.5px solid ${sel===i?T.s03:T.n03}`,background:sel===i?"#F0FDF4":"white",opacity:sel===i?1:0.5,cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:22}}>{o.e}</span>
            <div style={{width:22,height:22,borderRadius:11,border:`2px solid ${sel===i?T.s03:T.n04}`,background:sel===i?T.s03:"transparent",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>{sel===i?"✓":""}</div></div>
          <div style={{fontSize:17,fontWeight:700,marginBottom:4}}>{o.t}</div>
          <div style={{fontSize:14,lineHeight:"20px",marginBottom:4}}>{o.d}</div>
          <div style={{fontSize:12,color:T.p04,fontStyle:"italic"}}>{o.why}</div>
        </Card>
      </div>)}
      <Card onClick={onClose} s={{marginBottom:8,border:`1px dashed ${T.n04}`,cursor:"pointer",textAlign:"center"}}><div style={{fontSize:15,fontWeight:600,color:T.p04,padding:4}}>Talk with my trainer instead</div></Card>
      <div style={{padding:"8px 0 24px"}}><Btn onClick={()=>onAccept(opts[sel].t)}>Accept Commitment</Btn></div>
    </div><HI/>
  </div>;
};

// ═══ BODY MEASUREMENTS ═══
const BodyMeasure=({onDone,onClose})=>{
  const [filled,setFilled]=useState({weight:false,waist:false,hips:false,chest:false});
  const vals={weight:"118.5",waist:"30.0",hips:"37.5",chest:"35.0"};
  const prev={weight:"120.0",waist:"30.5",hips:"38.0",chest:"35.5"};
  const allFilled=Object.values(filled).every(Boolean);
  const fields=[{k:"weight",label:"Body Weight",unit:"lbs"},{k:"waist",label:"Waist",unit:"in"},{k:"hips",label:"Hips",unit:"in"},{k:"chest",label:"Chest",unit:"in"}];
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
    <SB/><Nav left={<Back onClick={onClose}/>} title="Weekly Check-in"/>
    <div style={{flex:1,padding:"0 16px",overflowY:"auto"}}>
      <div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:36,marginBottom:8}}>📏</div><div style={{fontSize:20,fontWeight:700,marginBottom:4}}>Weekly Body Measurements</div><div style={{fontSize:14,color:T.n06}}>Tap each field to auto-fill (demo)</div></div>
      {fields.map(f=><div key={f.k} onClick={()=>setFilled(p=>({...p,[f.k]:true}))} style={{background:filled[f.k]?T.s01:T.n02,border:`1px solid ${filled[f.k]?T.s02:T.n03}`,borderRadius:8,padding:14,marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{f.label}</div>
          {filled[f.k]?<div style={{display:"flex",alignItems:"baseline",gap:4,marginTop:2}}>
            <span style={{fontSize:22,fontWeight:700,color:T.s03}}>{vals[f.k]}</span><span style={{fontSize:13,color:T.n06}}>{f.unit}</span>
            <span style={{fontSize:12,color:T.s03,marginLeft:8}}>↓ {(prev[f.k]-vals[f.k]).toFixed(1)}</span>
          </div>:<div style={{fontSize:13,color:T.n05,marginTop:2}}>Prev: {prev[f.k]} {f.unit}</div>}
        </div>
        {filled[f.k]&&<span style={{color:T.s03,fontSize:18}}>✓</span>}
      </div>)}
    </div>
    <div style={{padding:16,flexShrink:0}}><Btn onClick={()=>allFilled&&onDone()} s={{opacity:allFilled?1:0.4}}>Save & See Insights</Btn></div><HI/>
  </div>;
};

// ═══ COMMITMENT INSIGHTS (with 4 options on last summary) ═══
const CommitInsights=({habit,energyData=[],isLast=true,onNext,summaryLabel,onContinue,onSwitch,onAddOn,onSpeakTrainer,onClose})=>{
  const completed=energyData.filter(v=>v>0).length;
  const total=energyData.length;
  const rate=total?Math.round((completed/total)*100):0;
  const avgCompleted=completed?((energyData.filter(v=>v>0).reduce((a,b)=>a+b,0)/completed)).toFixed(1):"–";
  const dayLabels=["Day 1","Day 2","Day 3","Day 4","Day 5"];
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
  <SB/><Nav left={<Back onClick={onClose}/>} title={`Commitment Insights ${summaryLabel||""}`}/>
  <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
    <div style={{background:`linear-gradient(135deg,${T.s01},#E0F5E8)`,borderRadius:16,padding:20,margin:"8px 0 16px",textAlign:"center"}}>
      <div style={{fontSize:40,marginBottom:8}}>🎯</div>
      <div style={{fontSize:20,fontWeight:700,marginBottom:4}}>Commitment Report</div>
      <div style={{fontSize:14,color:T.n06}}>{habit}</div>
    </div>
    {rate>=80&&<div style={{background:T.s01,border:`1px solid ${T.s02}`,borderRadius:8,padding:12,marginBottom:12,textAlign:"center",fontSize:15,fontWeight:600,color:T.s03}}>Amazing work! You completed {rate}% of your commitment this week! 🎉</div>}
    {rate>=60&&rate<80&&<div style={{background:"#FFF8E0",border:`1px solid #FDE68A`,borderRadius:8,padding:12,marginBottom:12,textAlign:"center",fontSize:15,fontWeight:600,color:"#92400E"}}>Good effort! {rate}% completion — every day counts. Keep going! 💪</div>}
    {rate<60&&<div style={{background:T.e01,border:`1px solid #FECACA`,borderRadius:8,padding:12,marginBottom:12,textAlign:"center",fontSize:15,fontWeight:600,color:T.red}}>You completed {rate}% this week. That's okay — progress isn't linear. Let's figure out what works better for you. 💛</div>}
    <div style={{display:"flex",gap:8,marginBottom:12}}>
      {[{v:`${completed}/${total}`,l:"Completed",bg:T.p01,c:T.p04},{v:`${rate}%`,l:"Rate",bg:rate>=80?T.s01:"#FFF8E0",c:rate>=80?T.s03:T.or},{v:`${avgCompleted}/5`,l:"Avg Energy",bg:"#FFF8E0",c:T.or}].map((s,i)=>
        <div key={i} style={{flex:1,background:s.bg,borderRadius:12,padding:12,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:s.c}}>{s.v}</div><div style={{fontSize:11,color:T.n06}}>{s.l}</div></div>)}
    </div>
    <Card s={{marginBottom:10,padding:16}}><div style={{fontSize:15,fontWeight:700,marginBottom:8}}>Your {total} Check-ins</div>
      <div style={{display:"flex",gap:4,alignItems:"flex-end",height:80}}>
        {energyData.map((v,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          {v>0?<div style={{width:"100%",background:v>=4?T.s03:v>=3?T.or:T.e03,height:`${v*14}px`,borderRadius:"6px 6px 0 0",display:"flex",alignItems:"flex-end",justifyContent:"center"}}><span style={{fontSize:14,marginBottom:2}}>{emojis[v-1]}</span></div>
          :<div style={{width:"100%",background:"#FECACA",height:14,borderRadius:"6px 6px 0 0",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10}}>✕</span></div>}
          <span style={{fontSize:10,color:T.n06}}>{dayLabels[i]}</span>
        </div>)}
      </div>
    </Card>
    <Card s={{marginBottom:10,padding:16}}><div style={{fontSize:15,fontWeight:700,marginBottom:8}}>What Changed</div>
      <div style={{fontSize:14,lineHeight:"22px"}}><div style={{marginBottom:6}}>Energy avg <b>{avgCompleted}/5</b> across check-ins</div><div style={{marginBottom:6}}>Sleep quality <b>improved</b></div><div style={{marginBottom:6}}>Body weight: <b>120.0 → 118.5 lbs</b> (-1.5)</div><div>Waist: <b>30.5" → 30.0"</b> (-0.5")</div></div>
    </Card>
    {/* If not the last commitment summary, show Next button */}
    {!isLast&&onNext&&<div style={{padding:"8px 0 24px"}}><Btn onClick={onNext}>Next Commitment Report →</Btn></div>}
    {/* Only show 4 options on the last commitment summary */}
    {isLast&&<>
    <div style={{fontSize:17,fontWeight:700,marginBottom:12}}>What's next?</div>
    <Card onClick={onContinue} s={{marginBottom:8,border:`1.5px solid ${T.s02}`,cursor:"pointer"}}><div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:22}}>🔄</span><div><div style={{fontSize:15,fontWeight:700}}>Continue this commitment</div><div style={{fontSize:13,color:T.n06}}>Keep building your streak</div></div></div></Card>
    <Card onClick={onSwitch} s={{marginBottom:8,border:`1.5px solid ${T.p02}`,cursor:"pointer"}}><div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:22}}>🔀</span><div><div style={{fontSize:15,fontWeight:700}}>Switch to a different commitment</div><div style={{fontSize:13,color:T.n06}}>Try something new (food logging required for 1st week)</div></div></div></Card>
    <Card onClick={onAddOn} s={{marginBottom:8,border:`1.5px solid ${T.nut}`,cursor:"pointer"}}><div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:22}}>➕</span><div><div style={{fontSize:15,fontWeight:700}}>Add on a new commitment</div><div style={{fontSize:13,color:T.n06}}>Keep current + add another (food log required for new one)</div></div></div></Card>
    <Card onClick={onSpeakTrainer} s={{marginBottom:8,border:`1px dashed ${T.n04}`,cursor:"pointer"}}><div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:22}}>💬</span><div><div style={{fontSize:15,fontWeight:700}}>Speak with my trainer</div><div style={{fontSize:13,color:T.n06}}>Turn off, pause, or adjust my commitment</div></div></div></Card>
    </>}
    <div style={{height:24}}/>
  </div><HI/>
  </div>;
};

// ═══ FOOD LOG OPTIONAL CHOICE (after Continue) ═══
const FoodLogChoice=({onYes,onNo,onClose})=><div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
  <SB/><Nav left={<Back onClick={onClose}/>} title="Food Logging"/>
  <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 24px"}}>
    <div style={{fontSize:48,textAlign:"center",marginBottom:16}}>🥗</div>
    <div style={{fontSize:22,fontWeight:700,textAlign:"center",marginBottom:8}}>Continue food logging?</div>
    <div style={{fontSize:15,color:T.n06,textAlign:"center",lineHeight:"22px",marginBottom:24}}>Food logging is now optional since you're continuing with a familiar commitment. Logging gives you better tracking, but it's totally fine to skip.</div>
    <Btn onClick={onYes} s={{marginBottom:8}}>Yes, keep logging meals</Btn>
    <Btn onClick={onNo} s={{background:T.n02,color:T.n08,marginBottom:8}}>No thanks, just the commitment</Btn>
  </div><HI/>
</div>;

// ═══ CALENDAR ═══
const CalendarView=({onClose,hasCommit})=>{
  const dl=["S","M","T","W","T","F","S"];const train=[1,4,5,6,8,11,12,13,15,18,19,20];const habit=[11,12,13,15,18,19,20];const miss=[9,16];const today=21;
  const cells=[];for(let i=0;i<35;i++)cells.push(i<31?i+1:null);
  return <div style={{display:"flex",flexDirection:"column",height:"100%",background:"white"}}>
    <SB/><div style={{display:"flex",alignItems:"center",padding:"12px 16px",borderBottom:`1px solid ${T.n03}`}}><span onClick={onClose} style={{fontSize:20,cursor:"pointer"}}>✕</span><span style={{flex:1,textAlign:"center",fontSize:17,fontWeight:700}}>🔥 3 day streak</span><span style={{width:20}}/></div>
    <div style={{flex:1,padding:"0 12px",overflowY:"auto"}}>
      <div style={{fontSize:20,fontWeight:700,margin:"16px 4px 12px"}}>March 2026</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
        {dl.map((l,i)=><div key={i} style={{textAlign:"center",fontSize:13,fontWeight:600,color:T.n06,padding:6}}>{l}</div>)}
        {cells.map((d,i)=>{if(!d)return <div key={i}/>;const past=d<=today,isTo=d===today,tr=train.includes(d),ha=habit.includes(d),mi=miss.includes(d);
          return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"3px 0",gap:1}}>
            <div style={{fontSize:13,fontWeight:isTo?700:400,color:isTo?"white":past?T.n08:T.n05,width:26,height:26,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",background:isTo?T.n08:"transparent"}}>{d}</div>
            <div style={{width:26,height:26,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,background:tr?T.s03:mi?T.e03:past?"#ECECEC":"#F5F5F5",color:tr||mi?"white":T.n05}}>{tr?"🏋":mi?"✕":""}</div>
            {hasCommit&&d>=11&&<div style={{width:26,height:26,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,background:ha?T.p04:past?"#EDEAF2":"#F5F5F5",color:ha?"white":T.n05}}>{ha?"✓":""}</div>}
          </div>;})}
      </div>
      <div style={{display:"flex",gap:16,padding:"16px 4px",justifyContent:"center"}}><div style={{display:"flex",alignItems:"center",gap:4,fontSize:12}}><div style={{width:10,height:10,borderRadius:5,background:T.s03}}/> Training</div>{hasCommit&&<div style={{display:"flex",alignItems:"center",gap:4,fontSize:12}}><div style={{width:10,height:10,borderRadius:5,background:T.p04}}/> Nutrition</div>}<div style={{display:"flex",alignItems:"center",gap:4,fontSize:12}}><div style={{width:10,height:10,borderRadius:5,background:T.e03}}/> Missed</div></div>
    </div><HI/>
  </div>;
};

// ═══ TODAY ═══
const TodayTab=({ml,todayDone,commitments=[],showFoodLog,onLog,onHabit,onCal,day,simDate})=>{
  const dayLabels=["S","M","T","W","T","F","S"];const todayIdx=simDate.getDay();
  const weekDays=[];for(let i=0;i<7;i++){let t="upcoming";if(i<todayIdx)t=Math.random()>0.2?"done":"miss";if(i===todayIdx)t="today";weekDays.push({l:dayLabels[i],t});}
  const bg={done:T.s03,miss:T.e03,rest:T.n05,today:T.n08};const ic={done:"🏋",miss:"✕",today:"🏋"};
  const dateStr=simDate.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"});
  return <div style={{padding:"0 16px"}}>
    <div style={{background:T.p01,borderRadius:8,padding:"8px 12px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:13,fontWeight:600,color:T.p04}}>{dateStr}</span><span style={{fontSize:12,color:T.n06}}>Day {day+1}</span>
    </div>
    <Card s={{display:"flex",gap:12,alignItems:"center",marginBottom:12,border:`1px solid ${T.s02}`,background:T.s01}}>
      <div style={{width:40,height:40,borderRadius:20,background:T.s03,display:"flex",alignItems:"center",justifyContent:"center",color:T.p01,fontSize:18}}>✦</div>
      <div><div style={{fontSize:12,color:T.n06}}>Your Goal</div><div style={{fontSize:15,fontWeight:700}}>Look Thinner</div></div>
    </Card>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><span style={{fontSize:20,fontWeight:700}}>Today</span><span onClick={onCal} style={{fontSize:20,cursor:"pointer"}}>📅</span></div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:commitments.length>0?4:16}}>
      {weekDays.map((d,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flex:1}}><span style={{fontSize:13,fontWeight:600,color:T.n06}}>{d.l}</span><div style={{width:28,height:28,borderRadius:14,background:bg[d.t]||T.n03,color:["done","miss","today"].includes(d.t)?"white":T.n06,display:"flex",alignItems:"center",justifyContent:"center",fontSize:d.t==="miss"?12:10,fontWeight:700}}>{ic[d.t]||""}</div></div>)}
    </div>
    {commitments.length>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
      {weekDays.map((d,i)=>{const a=d.t==="done"||d.t==="today";return <div key={i} style={{flex:1,display:"flex",justifyContent:"center"}}><div style={{width:28,height:28,borderRadius:14,background:a?T.p04:"#EDEAF2",color:a?"white":T.n05,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>{a?"✓":""}</div></div>;})}
    </div>}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><span style={{fontSize:20,fontWeight:700}}>To Do</span><button style={{background:T.n02,border:`1px solid ${T.n03}`,borderRadius:8,padding:"6px 12px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Move Workouts</button></div>
    {showFoodLog&&<Card onClick={onLog} s={{display:"flex",gap:16,alignItems:"center",marginBottom:8,cursor:"pointer",border:`1px solid ${T.nut}`}}>
      <div style={{width:20,height:20,borderRadius:10,background:T.nut,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:T.s03}}>○</div>
      <div style={{flex:1}}><div style={{fontSize:17,fontWeight:700}}>Log Your Meal</div><div style={{fontSize:13,color:T.n06}}>{ml} logged today</div></div><Ch/>
    </Card>}
    {commitments.map((c,i)=>{const done=todayDone.has(i);return <Card key={c} onClick={()=>onHabit(i)} s={{display:"flex",gap:16,alignItems:"center",marginBottom:8,cursor:"pointer"}}>
      <div style={{width:20,height:20,borderRadius:10,background:done?T.s03:T.p04,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"white"}}>{done?"✓":"○"}</div>
      <div style={{flex:1}}><div style={{fontSize:17,fontWeight:700}}>{c}</div><div style={{fontSize:13,color:T.n06}}>{done?"Completed ✓":"Scheduled for today"}</div></div><Ch/>
    </Card>;})}
    <Card s={{display:"flex",gap:16,alignItems:"center",marginBottom:8}}><div style={{width:20,height:20,borderRadius:10,background:T.n03,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>🏋</div><div style={{flex:1}}><div style={{fontSize:17,fontWeight:700}}>Gym Day</div><div style={{fontSize:13,color:T.n06}}>181 mins</div></div><Ch/></Card>
    <div style={{fontSize:20,fontWeight:700,margin:"16px 0 12px"}}>Completed</div>
    <Card s={{display:"flex",gap:16,alignItems:"center",marginBottom:8}}><div style={{width:20,height:20,borderRadius:10,background:"#F8E0F0"}}/><div style={{flex:1}}><div style={{fontSize:17,fontWeight:700}}>Log your progress</div><div style={{fontSize:13,color:T.n06}}>Log Energy Level · 1 min</div></div><Ch/></Card>
    <div style={{height:24}}/>
  </div>;
};

// ═══ TEAMS ═══
const TeamsTab=({hasCommit})=>{
  const [sub,setSub]=useState("overview");
  return <div>
    <Nav left={<span style={{fontSize:20,color:T.n06}}>‹</span>} title="CSL" right={<div style={{width:32,height:32,borderRadius:16,background:T.n03,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>CS</div>}/>
    <div style={{display:"flex",borderBottom:`1px solid ${T.n03}`,padding:"0 16px"}}>{["Overview","Kudos"].map(t=><div key={t} onClick={()=>setSub(t.toLowerCase())} style={{padding:"12px 0",marginRight:20,fontSize:15,fontWeight:sub===t.toLowerCase()?700:500,color:sub===t.toLowerCase()?T.n08:T.n06,borderBottom:sub===t.toLowerCase()?`2px solid ${T.p04}`:"2px solid transparent",cursor:"pointer"}}>{t}</div>)}</div>
    <div style={{padding:16}}>
      {sub==="overview"&&<><Card s={{marginBottom:16,padding:16}}><div style={{fontSize:17,fontWeight:700,marginBottom:4}}>Weekly Team Goal</div><div style={{fontSize:13,color:T.n06,marginBottom:12}}>Complete 80% workouts</div><div style={{height:24,background:T.n03,borderRadius:12,overflow:"hidden"}}><div style={{width:"100%",height:"100%",background:T.s03,borderRadius:12}}/></div></Card>
        {hasCommit&&<Card s={{marginBottom:16,padding:16,border:`1px solid ${T.p02}`}}><div style={{fontSize:17,fontWeight:700,marginBottom:4}}>Nutrition Goal</div><div style={{fontSize:13,color:T.n06,marginBottom:12}}>80% nutrition habits as a team</div><div style={{height:24,background:T.n03,borderRadius:12,overflow:"hidden"}}><div style={{width:"70%",height:"100%",background:T.p04,borderRadius:12}}/></div><div style={{fontSize:12,color:T.n06,marginTop:8}}>15/21 habits</div></Card>}
      </>}
      {sub==="kudos"&&<Btn s={{background:T.p01,color:T.p04}}>Send Kudos 💪</Btn>}
    </div>
  </div>;
};

// ═══ PROGRESS (Metrics / Nutrition / Rewards) ═══
const fakeCommits=[
  {t:"Finish last meal before 9:00 PM",active:true,streak:"10",rate:"86%",start:"Mar 11, 2026",changes:[{v:"+23%",l:"Energy"},{v:"-1.5",l:"lbs"},{v:"-0.5\"",l:"Waist"}]},
  {t:"Eat before going out",active:false,streak:"14",rate:"71%",start:"Feb 10, 2026",changes:[{v:"+15%",l:"Energy"},{v:"↑",l:"Control"},{v:"-0.3\"",l:"Waist"}]},
  {t:"One fist of protein per meal",active:false,streak:"7",rate:"60%",start:"Jan 15, 2026",changes:[{v:"+10%",l:"Energy"},{v:"+2",l:"Muscle"},{v:"↑",l:"Recovery"}]},
];
const fakeWeeks=[
  {label:"Week of Mar 11–17",logs:15,tags:["Lunch inconsistent","✓ Breakfast solid","Low protein"]},
  {label:"Week of Feb 24–Mar 2",logs:12,tags:["✓ Timing improved","Hydration low","✓ 3 meals most days"]},
  {label:"Week of Feb 3–9",logs:18,tags:["✓ Great variety","Late dinners","Protein improving"]},
];

const ProgressTab=({onViewInsights})=>{
  const [sub,setSub]=useState("metrics");
  return <div>
    <Nav title="Progress" right={<span style={{fontSize:16}}>📅 ✏️</span>}/>
    <div style={{display:"flex",borderBottom:`1px solid ${T.n03}`,padding:"0 16px"}}>
      {["Metrics","Nutrition","Rewards"].map(t=><div key={t} onClick={()=>setSub(t.toLowerCase())} style={{padding:"12px 0",marginRight:16,fontSize:15,fontWeight:sub===t.toLowerCase()?700:500,color:sub===t.toLowerCase()?T.n08:T.n06,borderBottom:sub===t.toLowerCase()?`2px solid ${T.p04}`:"2px solid transparent",cursor:"pointer"}}>{t}</div>)}
    </div>
    <div style={{padding:16}}>
      {sub==="metrics"&&<>
        <Card s={{display:"flex",gap:12,alignItems:"center",marginBottom:16,border:`1px solid ${T.s02}`,background:T.s01}}><div style={{width:40,height:40,borderRadius:20,background:T.s03,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>✦</div><div><div style={{fontSize:12,color:T.n06}}>Your Goal</div><div style={{fontSize:15,fontWeight:700}}>Look Thinner</div></div></Card>
        <div style={{borderBottom:`1px solid ${T.n03}`,paddingBottom:16,marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between"}}><b>Bodyweight</b><span style={{fontSize:13,color:T.n06}}>3/13/2026</span></div><div style={{display:"flex",alignItems:"baseline",gap:4,margin:"8px 0"}}><span style={{fontSize:32,fontWeight:700,color:T.p04}}>120.0</span><span style={{color:T.n06}}>lbs</span></div></div>
        <div><div style={{display:"flex",justifyContent:"space-between"}}><b>Energy Level</b><span style={{fontSize:13,color:T.n06}}>3/20/2026</span></div><div style={{fontSize:28,margin:"8px 0"}}>😀</div></div>
      </>}
      {sub==="nutrition"&&<>
        <div style={{fontSize:17,fontWeight:700,marginBottom:12}}>Weekly Insights</div>
        {fakeWeeks.map((w,i)=><Card key={i} onClick={()=>onViewInsights(w.label)} s={{marginBottom:8,cursor:"pointer",border:i===0?`1.5px solid ${T.p02}`:`1px solid ${T.n03}`,opacity:i===0?1:0.7}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{w.label}</div><div style={{fontSize:12,color:T.n06}}>{w.logs} meals logged</div></div><Ch/></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:3,marginTop:8}}>{w.tags.map(t=><span key={t} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:t.startsWith("✓")?"#E8F8EE":"#FEF7E0",color:t.startsWith("✓")?T.s03:"#8B6914"}}>{t}</span>)}</div>
        </Card>)}
        <div style={{fontSize:17,fontWeight:700,margin:"20px 0 12px"}}>Commitment History</div>
        {fakeCommits.map((c,i)=><Card key={i} s={{marginBottom:8,opacity:c.active?1:0.7}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:6}}>{c.t}</div>
          <div style={{display:"flex",gap:4,marginBottom:6}}>
            <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:c.active?T.s01:T.n02,color:c.active?T.s03:T.n06,fontWeight:600}}>{c.active?"Active":"Completed"}</span>
            <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:T.p01,color:T.p04}}>{c.streak} day streak</span>
          </div>
          <div style={{display:"flex",gap:6}}>{c.changes.map((ch,j)=><div key={j} style={{flex:1,background:T.n02,borderRadius:6,padding:"4px 0",textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:T.s03}}>{ch.v}</div><div style={{fontSize:10,color:T.n06}}>{ch.l}</div></div>)}</div>
        </Card>)}
      </>}
      {sub==="rewards"&&<div style={{textAlign:"center",padding:"40px 20px"}}>
        <div style={{fontSize:48,marginBottom:16}}>🏆</div>
        <div style={{fontSize:20,fontWeight:700,marginBottom:8}}>Rewards</div>
        <div style={{fontSize:15,lineHeight:"22px",color:T.n06,marginBottom:24}}>Earn rewards by sticking to your commitments and making progress. Convert them to cash to use in the Trainwell store.</div>
        <div style={{background:T.p01,borderRadius:12,padding:20,border:`1px dashed ${T.p02}`}}>
          <div style={{fontSize:17,fontWeight:700,color:T.p04,marginBottom:4}}>Coming Soon</div>
          <div style={{fontSize:14,color:T.n06}}>We're building something special for you. Stay tuned!</div>
        </div>
      </div>}
    </div>
  </div>;
};

// ═══ CHAT ═══
const ChatTab=({logs,commitment})=>{
  const msgs=[{title:"Gym Day 2",sub:"Mar 19"}];
  for(let i=0;i<Math.min(logs,3);i++)msgs.push({title:"Meal logged",sub:"Mar 20",green:true});
  if(commitment)msgs.push({title:commitment,sub:"Mar 20",green:true});
  return <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div style={{display:"flex",alignItems:"center",padding:"8px 16px",gap:8}}><span style={{fontSize:20,color:T.n06}}>‹</span><div style={{width:36,height:36,borderRadius:18,background:"#C8B8DB",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>G</div><span style={{flex:1,fontSize:17,fontWeight:700}}>Gaby</span></div>
    <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
      {msgs.map((m,i)=><div key={i} style={{marginBottom:12}}><div style={{background:T.n02,borderRadius:12,padding:12,display:"flex",gap:12,alignItems:"center",maxWidth:300,marginLeft:"auto"}}>
        <div style={{width:28,height:28,borderRadius:14,background:m.green?T.nut:T.s03,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"white"}}>{m.green?"📸":"🏋"}</div>
        <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{m.title}</div><div style={{fontSize:11,color:T.n06}}>{m.sub}</div></div><Ch/></div></div>)}
    </div>
    <div style={{padding:"8px 16px",display:"flex",gap:8,alignItems:"center",borderTop:`1px solid ${T.n03}`}}><span>📷</span><input style={{flex:1,padding:10,border:`1px solid ${T.n04}`,borderRadius:20,fontSize:14,outline:"none",fontFamily:"inherit"}}/><button style={{width:36,height:36,borderRadius:18,background:T.p04,color:"white",border:"none",cursor:"pointer"}}>➤</button></div>
  </div>;
};

// ═══ TRAINER SIDE UI ═══
const trainerReport={
  overview:"Amy (Goal: Weight Loss) completed 15 meal logs across 7 days. Analysis based on photo-based food recognition, self-reported energy (avg 3.2/5) and hunger levels (avg 2.8/5), and meal timestamps.",
  sections:[
    {title:"Meal Timing Analysis",body:"Breakfast: 7:30–8:30 AM (σ=0.4h, highly consistent). Lunch: 12:00–2:30 PM (σ=1.2h, high variance — correlates with 30% lower PM energy on late-lunch days). Dinner: 6:30–8:00 PM (σ=0.7h, moderate). Late-night intake detected on 2/7 days (Fri, Sat), both after social outings."},
    {title:"Macronutrient Composition (Estimated)",body:"Protein: ~45g/day avg (below 0.7g/lb target for 120lb individual at 84g). Carbohydrate: dominant macronutrient across all meals. Fiber: adequate from vegetable intake at lunch/dinner but absent at breakfast. Fat: moderate, primarily from cooking oils and snacks."},
    {title:"Energy-Behavior Correlation",body:"Self-reported energy was 1.4 points higher (4.2 vs 2.8) on days with lunch before 1:30 PM and breakfast protein >15g. Lowest energy days coincided with skipped breakfast (2 days) and lunch after 2 PM."},
    {title:"Behavioral Patterns",body:"Consistent breakfast routine (5/7 days). Meal skipping under work stress (2 instances). Social eating on weekends disrupts timing but not quantity. Evening snacking post-9 PM linked to lower next-day energy ratings."},
  ],
  bullets:[
    "Lunch timing varies by 2.5h — days with late lunch show 30% lower afternoon energy scores",
    "Protein intake (~45g/day) is roughly half the recommended amount for her weight loss and training goals",
    "No late-night eating on 5/7 days — strong foundation for a meal timing commitment",
  ],
  commitmentLibrary:[
    {name:"Finish last meal before 9:00 PM",rationale:"Late eating on 2/7 days correlated with lower next-day energy. Closing the eating window by 9 PM supports circadian-aligned digestion and better sleep quality.",effect:"Expected: improved sleep scores, higher AM energy, reduced evening calorie intake.",delivery:"Frame as: 'Let's give your body time to rest before bed. No food after 9 — tea or water is fine.'"},
    {name:"One fist of protein per meal",rationale:"Current protein ~45g/day vs. 84g target. Low protein at breakfast is the biggest gap. Insufficient protein slows recovery and reduces satiety, leading to more snacking.",effect:"Expected: improved satiety between meals, better training recovery, supports lean mass during deficit.",delivery:"Frame as: 'Add a fist-sized portion of protein to each meal — chicken, eggs, yogurt, whatever you like.'"},
    {name:"Eat before going out",rationale:"Weekend social eating is Amy's primary disruption point. Eating a balanced meal before going out reduces impulsive overeating and alcohol-driven food choices.",effect:"Expected: reduced weekend calorie spikes, more consistent weekly intake, better Monday energy.",delivery:"Frame as: 'Going out tonight? Eat a real meal first so you're not starving when you get there.'"},
    {name:"Include vegetables in at least 2 meals",rationale:"Vegetable intake absent at breakfast, moderate at other meals. Increasing fiber supports satiety and micronutrient intake during calorie deficit.",effect:"Expected: improved fullness, better digestion, more stable blood sugar.",delivery:"Frame as: 'Try to get some color on your plate at lunch and dinner — whatever veggies you enjoy.'"},
    {name:"Eat breakfast within 1 hour of waking",rationale:"Breakfast skipped on 2/7 days, both high-stress mornings. Skipping correlated with higher hunger at lunch and larger lunch portions.",effect:"Expected: more stable energy through morning, reduced lunch overshoot.",delivery:"Frame as: 'Even something small within an hour of waking — yogurt, toast, a banana — sets your day up right.'"},
    {name:"Replace one processed snack with whole food",rationale:"Afternoon snacking detected 4/7 days, primarily processed/packaged items. Swapping one for whole food improves nutrient density without eliminating the habit.",effect:"Expected: small calorie reduction, better sustained energy, builds awareness of snack choices.",delivery:"Frame as: 'When you reach for an afternoon snack, try swapping one for fruit, nuts, or yogurt.'"},
  ],
};
const fakeNotes=["Felt rushed, grabbed fast food","Had a big salad, feeling good","Skipped lunch — meetings all day","Cooked at home, tried new recipe","Went out with friends, ate beforehand"];

const TrainerUI=({userGoal,totalLogs,commitments,commitDone,energyRatings,day})=>{
  const [tab,setTab]=useState("report");
  const [selectedBullets,setSelectedBullets]=useState(new Set());
  const [selectedCommits,setSelectedCommits]=useState(new Set());
  const [pushed,setPushed]=useState(false);
  const [scheduled,setScheduled]=useState(false);
  const [expandedHist,setExpandedHist]=useState(-1);
  const consecutiveMiss=energyRatings.slice(-3).every(v=>v===0)&&energyRatings.length>=3;
  const chk=({s,bg,bc})=>({width:18,height:18,borderRadius:4,border:`2px solid ${bc}`,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0,color:"white"});
  const histCommits=[
    {name:"Finish last meal before 9:00 PM",status:"Active",days:10,rate:"86%",started:"Mar 11",energy:[3,4,4,5,4,5,5,4,5,4],notes:["On track","Ate late — social dinner","Good day","Craving but resisted","Easy day"]},
    {name:"Eat before going out",status:"Completed",days:14,rate:"71%",started:"Feb 10",energy:[2,3,3,4,3,4,4,3,4,4,5,4,3,4],notes:["Forgot to eat before","Planned ahead","Worked well"]},
    {name:"One fist of protein per meal",status:"Completed",days:7,rate:"60%",started:"Jan 15",energy:[3,3,2,4,3,4,3],notes:["Hard to find protein at breakfast","Getting better"]},
  ];

  return <div style={{width:400,background:"white",borderRadius:20,overflow:"hidden",fontFamily:"'DM Sans',-apple-system,sans-serif",maxHeight:844,display:"flex",flexDirection:"column",border:`1px solid ${T.n03}`,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
    <div style={{padding:"16px 20px 8px",borderBottom:`1px solid ${T.n03}`}}>
      <div style={{fontSize:11,color:T.n06,textTransform:"uppercase",letterSpacing:1}}>Trainer Dashboard</div>
      <div style={{fontSize:18,fontWeight:700,marginTop:4,color:T.n08}}>Amy's Nutrition</div>
      <div style={{fontSize:13,color:T.n06,marginTop:2}}>Goal: {userGoal==="lose_weight"?"Lose Weight":"Feel More Energetic"} · Day {day+1}</div>
    </div>
    <div style={{display:"flex",borderBottom:`1px solid ${T.n03}`}}>
      {["report","commitments","monitor","history"].map(t=><div key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 0",textAlign:"center",fontSize:12,fontWeight:tab===t?700:400,color:tab===t?T.p04:T.n06,borderBottom:tab===t?`2px solid ${T.p04}`:"2px solid transparent",cursor:"pointer",textTransform:"capitalize"}}>{t}</div>)}
    </div>
    <div style={{flex:1,overflowY:"auto",padding:16,color:T.n08}}>
      {tab==="report"&&<>
        <div style={{fontSize:15,fontWeight:700,marginBottom:8}}>Food Awareness Report</div>
        <div style={{background:T.p01,borderRadius:8,padding:12,marginBottom:12,fontSize:12,lineHeight:"18px",color:T.n06}}>{trainerReport.overview}</div>
        {trainerReport.sections.map((s,i)=><div key={i} style={{marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:T.p04}}>{s.title}</div>
          <div style={{fontSize:12,lineHeight:"18px",color:T.n08,background:T.n02,borderRadius:6,padding:10}}>{s.body}</div>
        </div>)}
        <div style={{fontSize:13,fontWeight:700,marginBottom:8,marginTop:16,color:T.p04}}>Select insights to share with Amy:</div>
        {trainerReport.bullets.map((b,i)=><div key={i} onClick={()=>{const s=new Set(selectedBullets);s.has(i)?s.delete(i):s.add(i);setSelectedBullets(s);}} style={{display:"flex",gap:10,alignItems:"flex-start",padding:10,marginBottom:6,borderRadius:8,background:selectedBullets.has(i)?T.p01:"white",cursor:"pointer",border:`1px solid ${selectedBullets.has(i)?T.p02:T.n03}`}}>
          <div style={chk({bg:selectedBullets.has(i)?T.p04:"white",bc:selectedBullets.has(i)?T.p04:T.n04})}>{selectedBullets.has(i)?"✓":""}</div>
          <span style={{fontSize:12,color:T.n08}}>{b}</span>
        </div>)}
        {!scheduled?<button onClick={()=>setScheduled(true)} style={{width:"100%",padding:12,background:T.p04,color:"white",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer",marginTop:12,fontFamily:"inherit"}}>Schedule Meeting with Amy</button>
        :<div style={{background:T.s01,borderRadius:8,padding:12,marginTop:12,textAlign:"center"}}><span style={{color:T.s03,fontWeight:600}}>Meeting scheduled — Thu, Mar 26</span></div>}
        {scheduled&&!pushed&&selectedBullets.size>0&&<button onClick={()=>setPushed(true)} style={{width:"100%",padding:12,background:T.s03,color:"white",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer",marginTop:8,fontFamily:"inherit"}}>Push {selectedBullets.size} Insight{selectedBullets.size>1?"s":""} to Amy</button>}
        {pushed&&<div style={{background:T.s01,borderRadius:8,padding:12,marginTop:8,textAlign:"center"}}><span style={{color:T.s03}}>✓ Insights shared with Amy</span></div>}
      </>}

        <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>Commitment Library</div>
        <div style={{fontSize:12,color:T.n06,marginBottom:12}}>Select up to 3 to recommend. Each includes rationale, expected effect, and delivery framing.</div>
        {trainerReport.commitmentLibrary.map((c,i)=><div key={i} onClick={()=>{const s=new Set(selectedCommits);if(s.has(i))s.delete(i);else if(s.size<3)s.add(i);setSelectedCommits(s);}} style={{marginBottom:8,borderRadius:8,border:`1px solid ${selectedCommits.has(i)?T.p02:T.n03}`,background:selectedCommits.has(i)?T.p01:"white",cursor:"pointer",overflow:"hidden"}}>
          <div style={{display:"flex",gap:10,alignItems:"center",padding:"10px 12px"}}>
            <div style={chk({bg:selectedCommits.has(i)?T.p04:"white",bc:selectedCommits.has(i)?T.p04:T.n04})}>{selectedCommits.has(i)?"✓":""}</div>
            <span style={{fontSize:13,fontWeight:700}}>{c.name}</span>
          </div>
          <div style={{padding:"0 12px 10px",fontSize:11,lineHeight:"16px"}}>
            <div style={{marginBottom:4}}><span style={{fontWeight:700,color:T.p04}}>Why: </span><span style={{color:T.n06}}>{c.rationale}</span></div>
            <div style={{marginBottom:4}}><span style={{fontWeight:700,color:T.s03}}>Effect: </span><span style={{color:T.n06}}>{c.effect}</span></div>
            <div><span style={{fontWeight:700,color:T.or}}>Deliver as: </span><span style={{color:T.n06,fontStyle:"italic"}}>"{c.delivery.replace('Frame as: ','').replace(/'/g,'')}"</span></div>
          </div>
        </div>)}
        {selectedCommits.size>0&&!pushed&&<button onClick={()=>setPushed(true)} style={{width:"100%",padding:12,background:T.p04,color:"white",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer",marginTop:8,fontFamily:"inherit"}}>Push {selectedCommits.size} Commitment{selectedCommits.size>1?"s":""} to Amy</button>}
        {pushed&&<div style={{background:T.s01,borderRadius:8,padding:12,marginTop:8,textAlign:"center"}}><span style={{color:T.s03,fontWeight:600}}>✓ Commitments pushed to Amy</span></div>}
        {selectedCommits.size===0&&<div style={{fontSize:12,color:T.n06,marginTop:12,textAlign:"center"}}>Select commitments above to push to Amy</div>}
      </>}
      {tab==="monitor"&&<>
        <div style={{fontSize:15,fontWeight:700,marginBottom:12}}>Live Progress</div>
        {consecutiveMiss&&<div style={{background:T.e01,border:`1px solid ${T.e03}`,borderRadius:8,padding:12,marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:700,color:T.e03}}>⚠ Alert: Amy missed 3+ days in a row</div>
          <div style={{fontSize:12,color:T.n06,marginTop:4}}>Consider reaching out to check in and adjust her commitment.</div>
          <button style={{marginTop:8,padding:"6px 12px",background:T.e03,color:"white",border:"none",borderRadius:6,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Message Amy</button>
        </div>}
        <div style={{fontSize:12,color:T.n06,marginBottom:8}}>Check-ins ({energyRatings.length} total):</div>
        {energyRatings.length===0&&<div style={{color:T.n05,fontSize:13,textAlign:"center",padding:20}}>No check-ins yet</div>}
        {energyRatings.map((v,i)=><div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${T.n03}`}}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontSize:12,color:T.n06,width:40}}>Day {i+1}</span>
            {v>0?<><span style={{fontSize:16}}>{emojis[v-1]}</span><span style={{fontSize:12,color:T.s03}}>Completed (energy: {v}/5)</span></>
            :<span style={{fontSize:12,color:T.e03}}>✕ Missed</span>}
          </div>
          <div style={{marginTop:4,marginLeft:50,fontSize:11,color:T.n06,fontStyle:"italic"}}>{fakeNotes[i%fakeNotes.length]}</div>
        </div>)}
        {commitments.length>0&&<div style={{marginTop:16,fontSize:12,color:T.n06,background:T.n02,borderRadius:6,padding:8}}>Active: {commitments.join(", ")}</div>}
      </>}
      {tab==="history"&&<>
        <div style={{fontSize:15,fontWeight:700,marginBottom:8}}>History</div>
        <div style={{background:T.p01,borderRadius:8,padding:12,marginBottom:16,display:"flex",alignItems:"baseline",gap:6}}><span style={{fontSize:28,fontWeight:700,color:T.p04}}>{totalLogs}</span><span style={{fontSize:13,color:T.n06}}>meals logged total</span></div>
        <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>Commitment History</div>
        {histCommits.map((c,i)=><div key={i} style={{border:`1px solid ${T.n03}`,borderRadius:8,marginBottom:8,overflow:"hidden"}}>
          <div onClick={()=>setExpandedHist(expandedHist===i?-1:i)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,cursor:"pointer",background:expandedHist===i?T.n02:"white"}}>
            <div><div style={{fontSize:13,fontWeight:700}}>{c.name}</div><div style={{fontSize:11,color:T.n06,marginTop:2}}>{c.status} · {c.days} days · {c.rate}</div></div>
            <span style={{color:T.n05,fontSize:16}}>{expandedHist===i?"▾":"▸"}</span>
          </div>
          {expandedHist===i&&<div style={{padding:"0 12px 12px",borderTop:`1px solid ${T.n03}`}}>
            <div style={{fontSize:12,color:T.n06,marginTop:8}}>Started: {c.started}</div>
            <div style={{fontSize:12,fontWeight:600,marginTop:8,marginBottom:4}}>Energy over time:</div>
            <div style={{display:"flex",gap:2,alignItems:"flex-end",height:40}}>
              {c.energy.map((v,j)=><div key={j} style={{flex:1,background:v>=4?T.s03:v>=3?T.or:T.e03,height:`${v*8}px`,borderRadius:"3px 3px 0 0"}}/>)}
            </div>
            <div style={{fontSize:12,fontWeight:600,marginTop:10,marginBottom:4}}>Notes:</div>
            {c.notes.map((n,j)=><div key={j} style={{fontSize:11,color:T.n06,padding:"2px 0",fontStyle:"italic"}}>Day {j+1}: "{n}"</div>)}
          </div>}
        </div>)}
      </>}
    </div>
  </div>;
};

// ═══ APP ═══
export default function App(){
  const [goalStep,setGoalStep]=useState(true); // show goal selection first
  const [userGoal,setUserGoal]=useState("lose_weight");
  const [onb,setOnb]=useState(true);
  const [showTrainer,setShowTrainer]=useState(false);
  const [tab,setTab]=useState("today");
  const [ov,setOv]=useState(null);
  const [ml,setMl]=useState(0);const [totalLogs,setTotalLogs]=useState(0);
  const [commitments,setCommitments]=useState([]); // array of active strings
  const [usedCommitments,setUsedCommitments]=useState([]); // all ever picked (A/B/C tracking)
  const [todayDone,setTodayDone]=useState(new Set()); // indices of commitments done today
  const [commitDone,setCommitDone]=useState(0); // total "days" where ALL commitments checked in
  const [energyRatings,setEnergyRatings]=useState([]);
  const [insightsWeek,setInsightsWeek]=useState(1);
  const [day,setDay]=useState(0);
  const [showFoodLog,setShowFoodLog]=useState(true);
  const [activeIdx,setActiveIdx]=useState(0);
  const [summaryIdx,setSummaryIdx]=useState(0);
  const [commitMode,setCommitMode]=useState("new"); // "new" | "switch" | "addon"
  const [viewLabel,setViewLabel]=useState("");
  const [showNotif,setShowNotif]=useState(false);
  const ref=useRef(null);
  const simDate=new Date(2026,2,21+day);
  const activeCommit=commitments.length>0?commitments[activeIdx%commitments.length]:null;
  const allOpts=["Finish last meal before 9:00 PM","One fist of protein per meal","Eat before going out"];

  useEffect(()=>{if(ref.current)ref.current.scrollTop=0;},[tab,ov]);
  useEffect(()=>{if(showNotif){const t=setTimeout(()=>setShowNotif(false),5000);return()=>clearTimeout(t);}},[showNotif]);
  const advanceDay=()=>{setDay(d=>d+1);setTodayDone(new Set());setMl(0);};

  // After completing a commitment, check if all done for the day
  const handleCommitCheckin=(idx,energyVal)=>{
    const newDone=new Set(todayDone);newDone.add(idx);setTodayDone(newDone);
    setEnergyRatings(r=>[...r,energyVal]);
    // All commitments checked in for today?
    if(newDone.size>=commitments.length){
      const nd=commitDone+1;setCommitDone(nd);
      if(nd>=5){setTimeout(()=>setOv("bodyMeasure"),800);}
      else{setTimeout(()=>{advanceDay();setOv(null);},800);}
    } else {
      // More commitments to check in today — go back to today
      setTimeout(()=>setOv(null),600);
    }
  };

  const shortcuts=[
    {label:"Today",fn:()=>{setOv(null);setTab("today");}},
    {label:"Meal Log",fn:()=>setOv("logger")},
    {label:"Insight Card",fn:()=>setOv("insightCard")},
    {label:"Thank You",fn:()=>setOv("thankYou")},
    {label:"Schedule",fn:()=>setOv("schedule")},
    {label:"Coach Commit",fn:()=>{setCommitMode("new");setOv("coachCommit");}},
    {label:"Habit ✓",fn:()=>{if(commitments.length>0){setActiveIdx(0);setOv("habit");}}},
    {label:"Miss ✕",fn:()=>{if(commitments.length>0){setActiveIdx(0);setOv("missScreen");}}},
    {label:"Body Measure",fn:()=>setOv("bodyMeasure")},
    {label:"Commit Summary",fn:()=>{setSummaryIdx(0);setOv("commitInsights");}},
    {label:"Food Log?",fn:()=>setOv("foodLogChoice")},
    {label:"Progress",fn:()=>{setOv(null);setTab("progress");}},
    {label:"Nudge",fn:()=>setShowNotif(true)},
    {label:"Onboarding",fn:()=>{setGoalStep(true);setOnb(true);}},
  ];

  const Frame=({children})=><div style={{display:"flex",flexDirection:"column",alignItems:"center",minHeight:"100vh",background:"#E0DDE4",padding:16,fontFamily:"'DM Sans',-apple-system,sans-serif",color:T.n08}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
      <div style={{fontSize:11,fontWeight:500,color:T.n06,letterSpacing:1.5,textTransform:"uppercase"}}>Trainwell · Full App</div>
      <button onClick={()=>setShowTrainer(!showTrainer)} style={{fontSize:10,padding:"3px 10px",borderRadius:4,background:showTrainer?"#1A1A2E":"white",color:showTrainer?"white":T.p04,border:`1px solid ${showTrainer?"#1A1A2E":T.p02}`,cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>{showTrainer?"Hide":"Show"} Trainer View</button>
    </div>
    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
      <div style={{width:390,height:844,background:"white",borderRadius:44,overflow:"hidden",boxShadow:"0 30px 80px rgba(68,53,100,0.18)",display:"flex",flexDirection:"column",position:"relative",flexShrink:0}}>
        {showNotif&&commitments.length>0&&<NotifPopup commitment={commitments[0]} streak={commitDone+1} onTap={()=>{setShowNotif(false);setOv("habit");setActiveIdx(0);}} onDismiss={()=>setShowNotif(false)}/>}
        {children}
      </div>
      {showTrainer&&<TrainerUI userGoal={userGoal} totalLogs={totalLogs} commitments={commitments} commitDone={commitDone} energyRatings={energyRatings} day={day}/>}
    </div>
    <div style={{display:"flex",gap:6,alignItems:"center",marginTop:10,flexWrap:"wrap",justifyContent:"center",maxWidth:420}}>
      <div style={{fontSize:11,color:T.n05,width:"100%",textAlign:"center",marginBottom:4}}>Day {day+1} · Logs: {totalLogs} · Commit: {commitDone}/5 · Active: {commitments.length}</div>
      {shortcuts.map(s=><button key={s.label} onClick={s.fn} style={{fontSize:10,padding:"3px 8px",borderRadius:4,background:"white",color:T.p04,border:`1px solid ${T.p02}`,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>{s.label}</button>)}
    </div>
  </div>;

  if(goalStep)return <Frame><GoalSelect onSelect={(g)=>{setUserGoal(g);setGoalStep(false);}}/></Frame>;
  if(onb)return <Frame><Onboarding onDone={()=>setOnb(false)}/></Frame>;

  // Meal logger → save → show insight card (instant reward)
  if(ov==="logger")return <Frame><MealLogger onSave={()=>{const n=totalLogs+1;setMl(ml+1);setTotalLogs(n);setOv("insightCard");}} onClose={()=>setOv(null)} cnt={ml}/></Frame>;

  // Insight card after meal log → check if 5 logs triggers thank you page
  if(ov==="insightCard")return <Frame><InsightCard onDone={()=>{
    if(commitments.length===0&&totalLogs%5===0){setOv("thankYou");}else{setOv(null);}
  }}/></Frame>;

  // Thank you page → schedule → straight to coach commit
  if(ov==="thankYou")return <Frame><ThankYou onSchedule={()=>setOv("schedule")} onClose={()=>setOv(null)}/></Frame>;
  if(ov==="schedule")return <Frame><ScheduleConfirm onDone={()=>{setInsightsWeek(w=>w+1);setOv("coachCommit");}} onClose={()=>setOv("thankYou")}/></Frame>;

  // Coach commit — filter out used options
  if(ov==="coachCommit"){
    const avail=allOpts.filter(o=>!usedCommitments.includes(o));
    return <Frame><CoachCommit onAccept={(t)=>{setCommitments(c=>[...c,t]);setUsedCommitments(u=>[...u,t]);setShowFoodLog(true);setCommitDone(0);setEnergyRatings([]);setCommitMode("new");setOv(null);}} onClose={()=>setOv(null)} mode={commitMode} availableOpts={avail}/></Frame>;
  }

  // Habit: check in this commitment. Day only advances when ALL done.
  if(ov==="habit"){
    const done=todayDone.has(activeIdx);
    return <Frame><HabitDetail habit={activeCommit} done={done} onDo={(e)=>{
      handleCommitCheckin(activeIdx,e+1);
    }} onMiss={()=>{
      setOv("missScreen");
    }} onClose={()=>setOv(null)}/></Frame>;
  }

  // Miss screen — completely separate from HabitDetail so no green flash
  if(ov==="missScreen")return <Frame><div style={{display:"flex",flexDirection:"column",height:"100%",background:"#FECACA"}}>
    <SB/><div style={{display:"flex",justifyContent:"flex-end",padding:"8px 16px"}}><button onClick={()=>setOv(null)} style={{background:"none",border:"none",fontSize:15,fontWeight:600,color:T.red,cursor:"pointer",fontFamily:"inherit"}}>Close</button></div>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"0 32px"}}>
      <div style={{fontSize:64,marginBottom:16}}>💛</div>
      <div style={{fontSize:24,fontWeight:700,textAlign:"center",marginBottom:12,color:T.n08}}>It's okay.</div>
      <div style={{fontSize:18,textAlign:"center",lineHeight:"28px",color:T.n08}}>Progress isn't always linear. What matters is showing up again tomorrow.</div>
      <div style={{fontSize:15,color:T.n06,textAlign:"center",marginTop:16}}>You've got this. Your trainer believes in you.</div>
    </div>
    <div style={{padding:"0 16px 24px"}}><Btn onClick={()=>{handleCommitCheckin(activeIdx,0);}} s={{background:T.red}}>Try Again Tomorrow</Btn></div><HI/>
  </div></Frame>;

  // Body measure → straight to commitment summaries
  if(ov==="bodyMeasure")return <Frame><BodyMeasure onDone={()=>{setSummaryIdx(0);setOv("commitInsights");}} onClose={()=>setOv(null)}/></Frame>;

  // Show commitment summary for commitments[summaryIdx]
  if(ov==="commitInsights"){
    const currentCommit=commitments[summaryIdx]||commitments[0];
    const isLast=summaryIdx>=commitments.length-1;
    const nextSummary=()=>{ setSummaryIdx(s=>s+1); };
    return <Frame><CommitInsights habit={currentCommit} energyData={energyRatings}
      isLast={isLast}
      onNext={!isLast?nextSummary:undefined}
      summaryLabel={commitments.length>1?`(${summaryIdx+1}/${commitments.length})`:undefined}
      onContinue={()=>{advanceDay();setCommitDone(0);setEnergyRatings([]);setOv("foodLogChoice");}}
      onSwitch={()=>{setCommitments(c=>c.filter((_,i)=>i!==summaryIdx));setCommitDone(0);setEnergyRatings([]);advanceDay();setShowFoodLog(true);setCommitMode("switch");setOv("coachCommit");}}
      onAddOn={()=>{setCommitDone(0);setEnergyRatings([]);advanceDay();setShowFoodLog(true);setCommitMode("addon");setOv("coachCommit");}}
      onSpeakTrainer={()=>{advanceDay();setCommitDone(0);setEnergyRatings([]);setOv(null);}}
      onClose={()=>{advanceDay();setCommitDone(0);setEnergyRatings([]);setOv(null);}}/></Frame>;
  }

  if(ov==="foodLogChoice")return <Frame><FoodLogChoice onYes={()=>{setShowFoodLog(true);setOv(null);}} onNo={()=>{setShowFoodLog(false);setOv(null);}} onClose={()=>setOv(null)}/></Frame>;
  if(ov==="calendar")return <Frame><CalendarView onClose={()=>setOv(null)} hasCommit={commitments.length>0}/></Frame>;

  return <Frame>
    <SB/>
    <div style={{padding:"4px 16px",display:"flex",justifyContent:"center"}}><span style={{fontSize:18,fontWeight:700,color:T.p04,fontStyle:"italic",letterSpacing:-0.5}}>trainwell</span></div>
    <div style={{display:"flex",alignItems:"center",padding:"0 16px 8px",gap:8}}>
      <div style={{width:36,height:36,borderRadius:18,background:`linear-gradient(135deg,#7B6BA0,${T.p04})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:14,fontWeight:700}}>A</div>
      <div style={{display:"flex",alignItems:"center",gap:4,border:`0.5px solid ${T.n05}`,padding:"4px 8px",borderRadius:8,fontSize:15,fontWeight:700,color:T.p04}}><span style={{color:T.e03}}>🔥</span> 3</div>
    </div>
    <div ref={ref} style={{flex:1,overflowY:"auto"}}>
      {tab==="today"&&<TodayTab ml={ml} todayDone={todayDone} commitments={commitments} showFoodLog={showFoodLog} onLog={()=>setOv("logger")} onHabit={(i)=>{setActiveIdx(i);setOv("habit");}} onCal={()=>setOv("calendar")} day={day} simDate={simDate}/>}
      {tab==="teams"&&<TeamsTab hasCommit={commitments.length>0}/>}
      {tab==="workouts"&&<div style={{padding:40,textAlign:"center",color:T.n06}}>Workouts tab</div>}
      {tab==="progress"&&<ProgressTab onViewInsights={()=>{}}/>}
      {tab==="chat"&&<ChatTab logs={totalLogs} commitment={commitments[0]}/>}
    </div>
    <TabBar a={tab} onTab={setTab}/><HI/>
  </Frame>;
}
