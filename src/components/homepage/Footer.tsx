

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800 py-6">
        <div className="container mx-auto px-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 text-sm">
                <span>&copy; {currentYear} RestMetrics. All rights reserved</span>
            </div>
        </div>
    </footer>
  )
}
