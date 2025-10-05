import { createStore } from 'zustand/vanilla';
import { subscribeWithSelector } from "zustand/middleware";

export const meshUseStore =  createStore(subscribeWithSelector((set) => ({
  meshs: {},           
  selectedMeshIdx: null,
  selectedMeshIdxs: {},
  highlightedMeshIdx: null,
  hoveredMeshIdx: null,

  // 상태 업데이트 함수
  setSelectedMesh: (mesh) => set((state) => ({ ...state, selectedMeshIdx: mesh })),
  setHighlightedMesh: (mesh) => set((state) => ({ ...state, highlightedMeshIdx: mesh })),
  setHoveredMesh: (mesh) => set((state) => ({ ...state, hoveredMeshIdx: mesh })),

      addMesh: (mesh) => {
      set((state) => ({
        meshs: {
          ...state.meshs,
          [mesh.uuid]: mesh,  // uuid를 key로 Mesh 저장
        },
      }));
    },
  removeMesh: (mesh) => set(state => ({ meshs: state.meshs.filter(m => m !== mesh) })),

  addSelectedMeshIdx: (id, value = true) =>
    set((state) => ({
      selectedMeshIdxs: { ...state.selectedMeshIdxs, [id]: value },
    })),

  // ✅ 특정 key 삭제
  removeSelectedMeshIdx: (id) =>
    set((state) => {
      const updated = { ...state.selectedMeshIdxs };
      delete updated[id];
      return { selectedMeshIdxs: updated };
    }),

  // ✅ 전체 초기화
  clearSelectedMeshIdxs: () => set({ selectedMeshIdxs: {} }),
  
  
})));


