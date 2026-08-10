<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const props = defineProps({
  locations: {
    type: Array,
    default: () => [],
  },
  center: {
    type: Array,
    default: () => [0, 100],
  },
  zoom: {
    type: Number,
    default: 4,
  },
})

const mapEl = ref(null)
let map = null
let layerGroup = null

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function renderMarkers() {
  if (!map) return
  if (layerGroup) {
    layerGroup.clearLayers()
  } else {
    layerGroup = L.layerGroup().addTo(map)
  }

  const bounds = []
  props.locations.forEach((loc) => {
    const marker = L.marker([loc.lat, loc.lng]).bindPopup(
      `<strong>${loc.name}</strong>`,
    )
    layerGroup.addLayer(marker)
    bounds.push([loc.lat, loc.lng])
  })

  if (bounds.length > 1) {
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 7 })
  } else if (bounds.length === 1) {
    map.setView(bounds[0], Math.max(props.zoom, 6))
  } else {
    map.setView(props.center, props.zoom)
  }
}

onMounted(() => {
  if (!mapEl.value) return
  map = L.map(mapEl.value, {
    scrollWheelZoom: false,
  }).setView(props.center, props.zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map)

  renderMarkers()
  setTimeout(() => map?.invalidateSize(), 80)
})

watch(
  () => [props.locations, props.center, props.zoom],
  () => {
    renderMarkers()
    setTimeout(() => map?.invalidateSize(), 80)
  },
  { deep: true },
)

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
    layerGroup = null
  }
})
</script>

<template>
  <div
    ref="mapEl"
    class="h-[360px] w-full overflow-hidden border border-border bg-surface sm:h-[420px]"
  />
</template>
