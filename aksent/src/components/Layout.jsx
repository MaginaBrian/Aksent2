import { Outlet } from 'react-router-dom';
import { SiteContentProvider } from '../context/SiteContent';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <SiteContentProvider>
      <Header />
      <main className="aksent-main">
        <Outlet />
      </main>
      <Footer />
    </SiteContentProvider>
  );
}
