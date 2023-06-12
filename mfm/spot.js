const malls = [
  { label: "A", name: "갑사", lat: 36.374697, lng: 127.178566, address: "", image: "A.jpg" },
  { label: "B", name: "구인사", lat: 37.03121, lng: 128.47920, address: "", image: "B.jpg" },
  { label: "C", name: "마곡사", lat: 36.55818, lng: 127.01255, address: "", image: "C.jpg" },
  { label: "D", name: "무량사", lat: 36.31299, lng: 126.69738, address: "", image: "D.jpg" },
  { label: "E", name: "미륵대흥사", lat: 36.856306, lng: 128.347508, address: "", image: "E.jpg" },
  { label: "F", name: "반야사", lat: 36.28059, lng: 127.90927, address: "", image: "F.jpg" },
  { label: "G", name: "법주사", lat: 36.54381, lng: 127.83508, address: "", image: "G.jpg" },
  { label: "H", name: "부석사", lat: 36.99505, lng: 128.68203, address: "", image: "H.jpg" },
  { label: "I", name: "서광사", lat: 36.78886, lng: 126.44632, address: "", image: "I.jpg" },
  { label: "J", name: "석종사", lat: 36.94875, lng: 127.96955, address: "", image: "J.jpg" },
  { label: "K", name: "수덕사", lat: 36.66181, lng: 126.62210, address: "", image: "K.jpg" },
  { label: "L", name: "신안사", lat: 36.12293, lng: 127.54355, address: "", image: "L.jpg" },
  { label: "M", name: "영랑사", lat: 36.91481, lng: 126.60287, address: "", image: "M.jpg" },
  { label: "N", name: "영국사", lat: 36.15813, lng: 127.61049, address: "", image: "N.jpg" },
  { label: "O", name: "영평사", lat: 36.43323, lng: 127.22778, address: "", image: "O.jpg" },
  { label: "P", name: "용화사", lat: 36.64156, lng: 127.48205, address: "", image: "P.jpg" },
  { label: "Q", name: "지장정사", lat: 36.3299374, lng: 127.1127405, address: "", image: "Q.jpg" },
  { label: "R", name: "학림사", lat: 36.3405229, lng: 127.3108601, address: "", image: "R.jpg" },
  { label: "S", name: "한국문화연수원", lat: 36.56548, lng: 127.01023, address: "", image: "S.jpg" }
];

window.initMap = function() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.5400456, lng: 126.9921017 },
    zoom: 30,
  });

  const bounds = new google.maps.LatLngBounds();
  const infoWindow = new google.maps.InfoWindow();
  const markerList = document.getElementById("marker-ul");

  malls.forEach(({ label, name, lat, lng, address, image }) => {
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
      <img src="${image}" alt="Spot Image" style="width: 100px; height: 100px; margin-right: 50px;">
      ${name}
    `;
    markerList.appendChild(markerItem);
    markerItem.style.backgroundColor = "rgba(128, 128, 128, 0.1)";
    markerItem.style.marginBottom = "10px";

    markerItem.addEventListener("click", () => {
      map.panTo(marker.position);
      const content = `
        <h3>${name}</h3>
        <img src="${image}" alt="Spot Image" style="width: 200px; height: 150px; margin-bottom: 10px;">
        <p>${address}</p>
      `;
      infoWindow.setContent(content);
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