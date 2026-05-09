import './globals.css'
export const metadata: Metadata = {
  title: 'Bazar.pk',
  description: 'Pakistan ka Online Bazar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0,padding:0,overflowX:'hidden',boxSizing:'border-box'}}>
        {children}
      </body>
    </html>
  )
}