
(function(){
  const _0x3df5=["getElementById","style","display","none","block","onclick","open","_blank","addEventListener","mousedown","clientX","offsetLeft","clientY","offsetTop","grabbing","mouseup","move","mousemove","innerWidth","offsetWidth","innerHeight","offsetHeight","left","px","top","right","auto","predictBtn","click","value","dice1","dice2","dice3","extra","some","isNaN","<span class='xiu'>Xỉu</span>","<span class='tai'>Tài</span>","includes","innerHTML"];
  const toolPopup=document[_0x3df5[0]]("toolPopup");
  const closeBtn=document[_0x3df5[0]]("closeBtn");
  const openBtn=document[_0x3df5[0]]("openBtn");
  const adminBtn=document[_0x3df5[0]]("adminBtn");

  closeBtn[_0x3df5[5]]=()=>{toolPopup[_0x3df5[1]][_0x3df5[2]]=_0x3df5[3];openBtn[_0x3df5[1]][_0x3df5[2]]=_0x3df5[4];};
  openBtn[_0x3df5[5]]=()=>{toolPopup[_0x3df5[1]][_0x3df5[2]]="flex";openBtn[_0x3df5[1]][_0x3df5[2]]=_0x3df5[3];};
  adminBtn[_0x3df5[5]]=()=>{const fb="https://www.facebook.com/lequanghung0308";window[_0x3df5[6]](fb,_0x3df5[7]);};

  const header=document[_0x3df5[0]]("toolHeader");
  let isDragging=false,offsetX=0,offsetY=0;

  header[_0x3df5[8]](_0x3df5[9],e=>{isDragging=true;offsetX=e[_0x3df5[10]]-toolPopup[_0x3df5[11]];offsetY=e[_0x3df5[12]]-toolPopup[_0x3df5[13]];header[_0x3df5[1]].cursor=_0x3df5[14];});
  window[_0x3df5[8]](_0x3df5[15],()=>{isDragging=false;header[_0x3df5[1]].cursor=_0x3df5[16];});
  window[_0x3df5[8]](_0x3df5[17],e=>{if(!isDragging)return;let x=e[_0x3df5[10]]-offsetX,y=e[_0x3df5[12]]-offsetY;x=Math.max(0,Math.min(window[_0x3df5[18]]-toolPopup[_0x3df5[19]],x));y=Math.max(0,Math.min(window[_0x3df5[20]]-toolPopup[_0x3df5[21]],y));toolPopup[_0x3df5[1]][_0x3df5[22]]=x+_0x3df5[23];toolPopup[_0x3df5[1]][_0x3df5[24]]=y+_0x3df5[23];toolPopup[_0x3df5[1]][_0x3df5[25]]=_0x3df5[26];});

  document[_0x3df5[0]](_0x3df5[27])[_0x3df5[8]](_0x3df5[28],function(){
    const d1=parseInt(document[_0x3df5[0]](_0x3df5[29])[_0x3df5[28]]),d2=parseInt(document[_0x3df5[0]](_0x3df5[30])[_0x3df5[28]]),d3=parseInt(document[_0x3df5[0]](_0x3df5[31])[_0x3df5[28]]),e=parseInt(document[_0x3df5[0]](_0x3df5[32])[_0x3df5[28]]);
    if([d1,d2,d3,e][_0x3df5[33]](v=>isNaN(v)||v<1||v>6)){
      document[_0x3df5[0]]("result")[_0x3df5[40]]="⚠️ Vui lòng nhập đủ 4 số từ 1 đến 6!";return;
    }
    let total=d1+d2+d3+e;
    const mod=total%12;
    const xiuSet=[0,2,4,6,8,10];
    const result=xiuSet[_0x3df5[38]](mod)?_0x3df5[35]:_0x3df5[36];
    document[_0x3df5[0]]("result")[_0x3df5[40]]="Max: "+total+"<br>Fram ~: "+mod+"<br>"+result;
  });
})();