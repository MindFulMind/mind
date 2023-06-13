const malls = [
    { label: "A", name: "힐리언스 선마을 ", lat: 37.6515696887074, lng: 127.630413170377, address: "", image: "A1.jpg", content:"Power MeditatIon &Deep Meditation"},
    { label: "B", name: "전인교육센터", lat: 36.3223884, lng: 127.1815099, address: "", image: "B1.png", content:"Stress Management & Healing Mind Reset" },
    { label: "C", name: "문경 세계명상마을", lat: 36.6996835935641, lng: 128.017975452295, address: "", image: "C1.jpg", content:"Wisdom & Insight" },
    { label: "D", name: "힐리언스 선마을 ", lat: 37.6515696887074, lng: 127.630413170377, address: "", image: "A1.jpg", content:"Breathing and recognizing body sensation of the body" },
    { label: "E", name: "전인교육센터", lat: 36.3223884, lng: 127.1815099, address: "", image: "B1.png", content:"Self-reflection and mindfulness meditation" },
  ];
  
  window.initMap = function() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.5400456, lng: 126.9921017 },
      zoom: 30,
    });
  
    const bounds = new google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow();
    const markerList = document.getElementById("marker-ul");
  
    malls.forEach(({ label, name, lat, lng, address, image, content }) => {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        label,
        map,
      });
      bounds.extend(marker.position);
  
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: marker.position }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            address = results[0].formatted_address.replace("대한민국", "");
          }
        } else {
          console.error("Geocode failed due to: " + status);
        }
      });
  
      marker.addListener("click", () => {
        map.panTo(marker.position);
        const content = `
          <h3>${name}</h3>
          <img src="${image}" alt="Spot Image" style="width: 200px; height: 150px; margin-bottom: 10px;">
          <p>Address: ${address}</p>
        `;
        infoWindow.setContent(content);
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
  
      const markerItem = document.createElement("li");
      markerItem.innerHTML = `
        <img src="${image}" alt="Spot Image" style="width: 100px; height: 100px; margin-right: 10px;">
        ${content}
      `;
      markerList.appendChild(markerItem);
      markerItem.style.backgroundColor = "rgba(128, 128, 128, 0.1)";
      markerItem.style.marginBottom = "10px";
  
      markerItem.addEventListener("click", () => {
        map.panTo(marker.position);
        const contents = `
          <h3>${name}</h3>
          <img src="${image}" alt="Spot Image" style="width: 200px; height: 150px; margin-bottom: 10px;">
          <p>${address}</p>
          Program : ${content}
        `;
        infoWindow.setContent(contents);
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
    });
  
    infoWindow.addListener("domready", () => {
      const infoWindowContent = document.querySelector(".gm-style-iw");
      const infoWindowContainer = infoWindowContent.parentNode;
      infoWindowContainer.style.textAlign = "center";
    });
    map.fitBounds(bounds);
  };