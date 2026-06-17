import { useState } from 'react'
import './App.css'
import { lessons } from './data/lessons'
import TopScreen from './components/TopScreen'
import TextReader from './components/TextReader'
import Flashcard from './components/Flashcard'
import GrammarViewer from './components/GrammarViewer'

type Tab = 'text' | 'vocab' | 'grammar'
type Page = 'top' | 'lesson'

function App() {
  const [page, setPage] = useState<Page>('top')
  const [selectedVol, setSelectedVol] = useState<number | null>(null)
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('text')

  const handleSelectLesson = (vol: number, lessonId: number) => {
    setSelectedVol(vol)
    setSelectedLessonId(lessonId)
    setActiveTab('text')
    setPage('lesson')
  }

  const handleBack = () => {
    setPage('top')
  }

  if (page === 'top') {
    return <TopScreen onSelectLesson={handleSelectLesson} />
  }

  const lesson = lessons.find(
    (l) => l.vol === selectedVol && l.id === selectedLessonId
  )
  if (!lesson) return null

  return (
    <div>
      <header className="app-header">
        <div className="app-header-top">
          <button className="back-btn" onClick={handleBack}>
            ← 戻る
          </button>
          <div className="lesson-badge">Vol {lesson.vol} · Lesson {lesson.id}</div>
        </div>
        <h1>{lesson.summary}</h1>
      </header>

      <nav className="tab-bar">
        <button
          className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          <span className="tab-icon">📖</span>
          本文リーダー
        </button>
        <button
          className={`tab-btn ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => setActiveTab('vocab')}
        >
          <span className="tab-icon">📋</span>
          単語一覧
        </button>
        <button
          className={`tab-btn ${activeTab === 'grammar' ? 'active' : ''}`}
          onClick={() => setActiveTab('grammar')}
        >
          <span className="tab-icon">📝</span>
          文法解説
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'text' && <TextReader dialogues={lesson.dialogues} />}
        {activeTab === 'vocab' && <Flashcard vocabulary={lesson.vocabulary} />}
        {activeTab === 'grammar' && <GrammarViewer grammar={lesson.grammar} />}
      </main>
    </div>
  )
}

export default App
