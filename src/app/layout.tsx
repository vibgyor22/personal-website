import type { Metadata } from "next";
import { Instrument_Sans, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ParticleBackground } from "@/components/ParticleBackground";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibhor Vanvani",
  description:
    "A digital notebook — economics, data science, building things, and the questions in between.",
  openGraph: {
    title: "Vibhor Vanvani",
    description:
      "Researcher, builder, thinker. Cambridge MPhil Economics & Data Science '27.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <a href="#about" className="skip-link">
          Skip to content
        </a>
        <ParticleBackground />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
