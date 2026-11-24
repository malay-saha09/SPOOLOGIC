import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import ScenarioToolbar from '@/components/ScenarioToolbar';
import CartDrawer from '@/components/CartDrawer';
import VehicleSelectModal from '@/components/VehicleSelectModal';
import PurchaseAckModal from '@/components/PurchaseAckModal';
import Footer from '@/components/Footer';
import ToastNotification from '@/components/ToastNotification';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0b0b0b'
};

export const metadata: Metadata = {
  title: 'Spoologic · Interactive Product Page Design',
  description: 'Interactive Product, Cart, and Checkout experience for SPOOLOGIC Stock Replacement Turbocharger and diesel systems.',
  icons: {
    icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Crect width=\'32\' height=\'32\' rx=\'6\' fill=\'%23e21b30\'/%3E%3Ctext x=\'16\' y=\'24\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'25\' font-weight=\'bold\' fill=\'white\'%3ES%3C/text%3E%3C/svg%3E'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {/* Top Review Toolbar and Navigation Flow Bar */}
          <ScenarioToolbar />

          {/* Site Header & Navigation */}
          <Header />
          <Navigation />

          {/* Main Page Content */}
          <main>{children}</main>

          {/* Interactive Modals & Offcanvas Drawers */}
          <CartDrawer />
          {/* <VehicleSelectModal /> */}
          <PurchaseAckModal />
          <ToastNotification />

          {/* Global Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
