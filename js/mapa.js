class MapaService{
    constructor(){this.map=null;this.markers=[];this.userPosition=null}
    async initMap(){
        const el=document.getElementById('map');if(!el)return;
        try{
            this.userPosition=await this.getLocation();
            this.map=new google.maps.Map(el,{center:this.userPosition,zoom:14,mapTypeControl:false,streetViewControl:false,fullscreenControl:false});
            new google.maps.Marker({position:this.userPosition,map:this.map,icon:{path:google.maps.SymbolPath.CIRCLE,scale:10,fillColor:'#F47920',fillOpacity:1,strokeColor:'#FFF',strokeWeight:2},title:'Você está aqui'});
        }catch(e){el.innerHTML='<div style="padding:20px;text-align:center;">📍 Ative sua localização</div>'}
    }
    getLocation(){return new Promise(resolve=>{if(navigator.geolocation){navigator.geolocation.getCurrentPosition(p=>resolve({lat:p.coords.latitude,lng:p.coords.longitude}),()=>resolve({lat:-23.5505,lng:-46.6333}),{timeout:5000})}else{resolve({lat:-23.5505,lng:-46.6333})}})}
}
const mapaService=new MapaService();
console.log('✅ MapaService carregado');
