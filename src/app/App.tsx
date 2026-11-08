import { BrowserRouter, Route, Routes } from 'react-router'
import { AppShell } from './AppShell'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
export default function App() {
  return <BrowserRouter><AppShell><Routes><Route path="/" element={<HomePage />} /><Route path="*" element={<NotFoundPage />} /></Routes></AppShell></BrowserRouter>
}
