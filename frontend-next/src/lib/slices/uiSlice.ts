import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface Modal {
  isOpen: boolean
  title: string
  content: React.ReactNode | null
}

interface UIState {
  loading: boolean
  modal: Modal
  toasts: Toast[]
}

const initialState: UIState = {
  loading: false,
  modal: {
    isOpen: false,
    title: '',
    content: null,
  },
  toasts: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    openModal: (state, action: PayloadAction<{ title: string; content: React.ReactNode }>) => {
      state.modal = {
        isOpen: true,
        title: action.payload.title,
        content: action.payload.content,
      }
    },

    closeModal: (state) => {
      state.modal = initialState.modal
    },

    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const toast: Toast = {
        id: Math.random().toString(36).substring(2, 9),
        ...action.payload,
      }
      state.toasts.push(toast)
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload)
    },
  },
})

export const { setLoading, openModal, closeModal, addToast, removeToast } = uiSlice.actions
export default uiSlice.reducer