import { MainTable } from './components/MainTable/MainTable'
import { TableForm } from './components/TableForm/TableForm'

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Products Table:</h1>
        <div className={styles.table}>
          <MainTable />
        </div>
        <div className={styles.form}>
          <h2>To add a new product, please, fill in the form below:</h2>
          <TableForm />
        </div>
      </div>
    </div>
  )
}

export default App