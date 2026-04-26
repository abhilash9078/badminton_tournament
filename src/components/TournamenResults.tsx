import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import tournamentOfficialsImage from "../../images/hostandref.jpeg";
import allFinalistsImage from "../../images/image_4.jpeg";
import runner2Image from "../../images/runner.jpeg";
import secondSeasonImage from "../../images/season2_all.jpeg";
import semis1Image from "../../images/semis1.jpeg";
import semis2Image from "../../images/semis2.jpeg";
import winner2Image from "../../images/winner.jpeg";
import winnerS4Image from "../../images/winner_s4.jpeg";
import runnerS4Image from "../../images/runner_s4.jpeg";
import firstSemiS4Image from "../../images/1stsemi_s4.jpeg";
import secondSemiS4Image from "../../images/2ndsemi_s4.jpeg";
import winnerS5Image from "../../images/winner_s5.jpeg";
import runnerS5Image from "../../images/runner_s5.jpeg";
import firstSemiS5Image from "../../images/semi1_s5.jpeg";
import secondSemiS5Image from "../../images/semi2_s5.jpeg";
import SectionTitle from "./SectionTitle";

const TournamentResults: React.FC = () => {
  const [expandedTournament, setExpandedTournament] = useState<string | null>(null);

  const toggleTournament = (tournament: string) => {
    setExpandedTournament(expandedTournament === tournament ? null : tournament);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50 scroll-mt-24">
      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        @keyframes rotate-icon {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(180deg);
          }
        }
        .rotate-icon {
          animation: rotate-icon 0.3s ease-out forwards;
        }
        .tournament-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tournament-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .tournament-button:active {
          transform: translateY(0);
        }
        /* Season 5 gallery — sharp, uncropped faces on mobile */
        .gallery-photo-frame {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        }
        @media (min-width: 640px) {
          .gallery-photo-frame {
            min-height: 280px;
          }
        }
        @media (min-width: 768px) {
          .gallery-photo-frame {
            min-height: 320px;
          }
        }
        .gallery-photo {
          width: 100%;
          height: auto;
          max-height: min(68vh, 520px);
          object-fit: contain;
          object-position: center center;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        @media (min-width: 768px) {
          .gallery-photo {
            max-height: 400px;
          }
        }
        .gallery-photo-frame--compact {
          min-height: 200px;
        }
        @media (min-width: 640px) {
          .gallery-photo-frame--compact {
            min-height: 240px;
          }
        }
        .gallery-photo--compact {
          max-height: min(55vh, 360px);
        }
        @media (min-width: 768px) {
          .gallery-photo--compact {
            max-height: 280px;
          }
        }
      `}</style>
      <div className="container mx-auto px-4">
        <SectionTitle>Winner gallery & tournament results</SectionTitle>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <div className="w-full">
                {/* Season 5.0 — latest */}
                <div className="pt-8">
                  <div className="mb-2 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900 ring-1 ring-amber-300/60">
                      Latest · Season 5.0
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-2 text-center">
                    Shuttle Showdown 5.0 winners
                  </h3>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="rounded-xl overflow-hidden shadow-lg border border-amber-200/90 bg-gradient-to-br from-amber-50 to-orange-50">
                      <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <h4 className="text-xl font-bold text-center">Champions</h4>
                      </div>
                      <div className="p-4 sm:p-5">
                        <div className="gallery-photo-frame w-full overflow-hidden rounded-xl ring-1 ring-black/5">
                          <img
                            src={winnerS5Image}
                            alt="Shuttle Showdown 5.0 champions Satish and Hari"
                            className="gallery-photo"
                            width={1600}
                            height={1200}
                            decoding="async"
                            fetchPriority="high"
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-center mt-4 mb-1 text-gray-800">
                          Satish &amp; Hari
                        </h5>
                        <p className="text-sm text-gray-600 text-center">Gold trophy — Season 5.0</p>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                      <div className="p-4 bg-slate-600 text-white">
                        <h4 className="text-xl font-bold text-center">Runners-up</h4>
                      </div>
                      <div className="p-4 sm:p-5">
                        <div className="gallery-photo-frame w-full overflow-hidden rounded-xl ring-1 ring-black/5">
                          <img
                            src={runnerS5Image}
                            alt="Shuttle Showdown 5.0 runners-up Ramanan and Ram"
                            className="gallery-photo"
                            width={1600}
                            height={1200}
                            decoding="async"
                            fetchPriority="high"
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-center mt-4 mb-1 text-gray-800">
                          Ramanan &amp; Ram
                        </h5>
                        <p className="text-sm text-gray-600 text-center">Silver trophy — Season 5.0</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="rounded-xl overflow-hidden shadow-md border border-amber-200/80 bg-amber-50/80">
                      <div className="p-3 bg-amber-400 text-white">
                        <h4 className="font-bold text-center">Semifinalists</h4>
                      </div>
                      <div className="p-4">
                        <div className="gallery-photo-frame gallery-photo-frame--compact w-full overflow-hidden rounded-xl ring-1 ring-black/5">
                          <img
                            src={firstSemiS5Image}
                            alt="Shuttle Showdown 5.0 semifinalists Suman and Sujnan"
                            className="gallery-photo gallery-photo--compact"
                            width={1600}
                            height={1200}
                            decoding="async"
                            loading="lazy"
                          />
                        </div>
                        <h5 className="font-semibold text-center mt-3 mb-1 text-gray-800">Suman &amp; Sujnan</h5>
                        <p className="text-sm text-gray-600 text-center">Bronze — Season 5.0</p>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-md border border-amber-200/80 bg-amber-50/80">
                      <div className="p-3 bg-amber-400 text-white">
                        <h4 className="font-bold text-center">Semifinalists</h4>
                      </div>
                      <div className="p-4">
                        <div className="gallery-photo-frame gallery-photo-frame--compact w-full overflow-hidden rounded-xl ring-1 ring-black/5">
                          <img
                            src={secondSemiS5Image}
                            alt="Shuttle Showdown 5.0 semifinalists Shiva and Ganesh"
                            className="gallery-photo gallery-photo--compact"
                            width={1600}
                            height={1200}
                            decoding="async"
                            loading="lazy"
                          />
                        </div>
                        <h5 className="font-semibold text-center mt-3 mb-1 text-gray-800">Shiva &amp; Ganesh</h5>
                        <p className="text-sm text-gray-600 text-center">Bronze — Season 5.0</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t-2 border-purple-100"></div>

                {/* Season 4.0 — archived results */}
                <div className="mb-8 pt-8">
                  <button
                    type="button"
                    onClick={() => toggleTournament("4th")}
                    aria-expanded={expandedTournament === "4th"}
                    aria-controls="past-season-4th-panel"
                    id="past-season-4th-trigger"
                    className="tournament-button group relative mb-6 flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 p-5 text-left text-white shadow-xl hover:shadow-2xl sm:p-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative z-10 flex min-w-0 flex-1 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30 sm:h-14 sm:w-14">
                        <span className="text-2xl sm:text-3xl">🏆</span>
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">Shuttle Showdown 4.0</h3>
                        <p className="mt-1 hidden text-sm text-white/80 sm:block">Previous season — expand to view photos</p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-white/90 sm:hidden">
                          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                          Tap to expand
                        </p>
                      </div>
                    </div>
                    <div
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/35 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/35 sm:h-12 sm:w-12"
                      aria-hidden
                    >
                      <ChevronDown
                        className={`h-5 w-5 text-white transition-transform duration-300 ease-out sm:h-6 sm:w-6 ${
                          expandedTournament === "4th" ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.5}
                      />
                    </div>
                  </button>

                  {expandedTournament === "4th" && (
                    <div id="past-season-4th-panel" role="region" aria-labelledby="past-season-4th-trigger" className="animate-slide-down">
                      <h3 className="text-xl font-bold text-purple-800 mb-6 text-center">
                        Season 4.0 results
                      </h3>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl overflow-hidden shadow-lg">
                          <div className="p-4 bg-yellow-500 text-white">
                            <h4 className="text-xl font-bold text-center">Champions</h4>
                          </div>
                          <div className="p-5">
                            <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-4">
                              <img
                                src={winnerS4Image}
                                alt="Tournament Winners - Gopichand and Vishesh"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: "center 30%" }}
                              />
                            </div>
                            <h5 className="text-lg font-semibold text-center mb-2">Gopichand & Vishesh</h5>
                            <p className="text-sm text-gray-600 text-center">Gold Trophy Winners</p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg">
                          <div className="p-4 bg-gray-500 text-white">
                            <h4 className="text-xl font-bold text-center">Runners-up</h4>
                          </div>
                          <div className="p-5">
                            <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-4">
                              <img
                                src={runnerS4Image}
                                alt="Tournament Runners-up - Aniketh and Mohan"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: "center 30%" }}
                              />
                            </div>
                            <h5 className="text-lg font-semibold text-center mb-2">Aniketh & Mohan</h5>
                            <p className="text-sm text-gray-600 text-center">Silver Trophy Winners</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-lg">
                          <div className="p-3 bg-amber-400 text-white">
                            <h4 className="font-bold text-center">Semifinalists</h4>
                          </div>
                          <div className="p-4">
                            <div className="w-full h-48 sm:h-48 md:h-48 overflow-hidden rounded-lg shadow-md mb-3">
                              <img
                                src={firstSemiS4Image}
                                alt="Semifinalists - Anshuman and Roshan"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: "center 30%" }}
                              />
                            </div>
                            <h5 className="font-semibold text-center mb-1">Anshuman & Roshan</h5>
                            <p className="text-sm text-gray-600 text-center">Bronze Medal Winners</p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-lg">
                          <div className="p-3 bg-amber-400 text-white">
                            <h4 className="font-bold text-center">Semifinalists</h4>
                          </div>
                          <div className="p-4">
                            <div className="w-full h-48 sm:h-48 md:h-48 overflow-hidden rounded-lg shadow-md mb-3">
                              <img
                                src={secondSemiS4Image}
                                alt="Semifinalists - Dhanuj and Sarthak"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: "center 30%" }}
                              />
                            </div>
                            <h5 className="font-semibold text-center mb-1">Dhanuj & Sarthak</h5>
                            <p className="text-sm text-gray-600 text-center">Bronze Medal Winners</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-12 pt-12 border-t-2 border-purple-100"></div>

                {/* Third Tournament Section */}
                <div className="mb-16 pt-12">
                  <button
                    type="button"
                    onClick={() => toggleTournament("3rd")}
                    aria-expanded={expandedTournament === "3rd"}
                    aria-controls="past-season-3rd-panel"
                    id="past-season-3rd-trigger"
                    className="tournament-button group relative mb-6 flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 p-5 text-left text-white shadow-xl hover:shadow-2xl sm:p-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative z-10 flex min-w-0 flex-1 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30 sm:h-14 sm:w-14">
                        <span className="text-2xl sm:text-3xl">🏸</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">Third Tournament Results</h3>
                        <p className="mt-1 hidden text-sm text-white/80 sm:block">Past season — expand to view</p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-white/90 sm:hidden">
                          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                          Expand for photos
                        </p>
                      </div>
                    </div>
                    <div
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/35 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/35 sm:h-12 sm:w-12"
                      aria-hidden
                    >
                      <ChevronDown
                        className={`h-5 w-5 text-white transition-transform duration-300 ease-out sm:h-6 sm:w-6 ${
                          expandedTournament === "3rd" ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.5}
                      />
                    </div>
                  </button>

                  {expandedTournament === "3rd" && (
                    <div id="past-season-3rd-panel" role="region" aria-labelledby="past-season-3rd-trigger" className="animate-slide-down">
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Winners */}
                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl overflow-hidden shadow-lg">
                          <div className="p-4 bg-yellow-500 text-white">
                            <h4 className="text-xl font-bold text-center">
                              Champions
                            </h4>
                          </div>
                          <div className="p-5">
                            <img
                              src={winner2Image}
                              alt="Tournament Winners - Bharath and Karthik"
                              className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                            />
                            <h5 className="text-lg font-semibold text-center mb-2">
                              Bharath & Karthik
                            </h5>
                            <p className="text-sm text-gray-600 text-center">
                              Gold Trophy Winners
                            </p>
                          </div>
                        </div>

                        {/* Runners-up */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg">
                          <div className="p-4 bg-gray-500 text-white">
                            <h4 className="text-xl font-bold text-center">
                              Runners-up
                            </h4>
                          </div>
                          <div className="p-5">
                            <img
                              src={runner2Image}
                              alt="Tournament Runners-up - Sanjay and Aditya"
                              className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                            />
                            <h5 className="text-lg font-semibold text-center mb-2">
                              Sanjay & Aditya
                            </h5>
                            <p className="text-sm text-gray-600 text-center">
                              Silver Trophy Winners
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Semifinalists 1 */}
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-lg">
                          <div className="p-3 bg-amber-400 text-white">
                            <h4 className="font-bold text-center">Semifinalists</h4>
                          </div>
                          <div className="p-4">
                            <img
                              src={semis1Image}
                              alt="Semifinalists - Kush and Rony"
                              className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
                            />
                            <h5 className="font-semibold text-center mb-1">
                              Kush & Rony
                            </h5>
                            <p className="text-sm text-gray-600 text-center">
                              Bronze Medal Winners
                            </p>
                          </div>
                        </div>

                        {/* Semifinalists 2 */}
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-lg">
                          <div className="p-3 bg-amber-400 text-white">
                            <h4 className="font-bold text-center">Semifinalists</h4>
                          </div>
                          <div className="p-4">
                            <img
                              src={semis2Image}
                              alt="Semifinalists - Purushottam and Suman"
                              className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
                            />
                            <h5 className="font-semibold text-center mb-1">
                              Purushottam & Suman
                            </h5>
                            <p className="text-sm text-gray-600 text-center">
                              Bronze Medal Winners
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Second Tournament Section */}
                <div className="mb-16 pt-12 border-t-2 border-green-100">
                  <button
                    type="button"
                    onClick={() => toggleTournament("2nd")}
                    aria-expanded={expandedTournament === "2nd"}
                    aria-controls="past-season-2nd-panel"
                    id="past-season-2nd-trigger"
                    className="tournament-button group relative mb-6 flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 p-5 text-left text-white shadow-xl hover:shadow-2xl sm:p-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative z-10 flex min-w-0 flex-1 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30 sm:h-14 sm:w-14">
                        <span className="text-2xl sm:text-3xl">🏸</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">Second Tournament Results</h3>
                        <p className="mt-1 hidden text-sm text-white/80 sm:block">Past season — expand to view</p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-white/90 sm:hidden">
                          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                          Expand for photos
                        </p>
                      </div>
                    </div>
                    <div
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/35 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/35 sm:h-12 sm:w-12"
                      aria-hidden
                    >
                      <ChevronDown
                        className={`h-5 w-5 text-white transition-transform duration-300 ease-out sm:h-6 sm:w-6 ${
                          expandedTournament === "2nd" ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.5}
                      />
                    </div>
                  </button>

                  {expandedTournament === "2nd" && (
                    <div id="past-season-2nd-panel" role="region" aria-labelledby="past-season-2nd-trigger" className="animate-slide-down">
                      <div className="mt-8 text-center">
                        <img
                          src={secondSeasonImage}
                          alt="Second tournament finalists"
                          className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                        />
                        <p className="text-sm text-gray-600 mt-3">
                          Second Tournament Finalists
                        </p>
                      </div>

                      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl shadow-sm">
                          <h4 className="font-semibold text-yellow-700 mb-3 text-center">
                            Champions
                          </h4>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="font-medium">Shivam & Jay</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Gold Trophy Winners
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm">
                          <h4 className="font-semibold text-gray-700 mb-3 text-center">
                            Runners-up
                          </h4>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="font-medium">Sarthak & Mahendran</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Silver Trophy Winners
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl shadow-sm">
                          <h4 className="font-semibold text-amber-700 mb-3 text-center">
                            Semifinalists
                          </h4>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="font-medium">Rishav & Mano</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg text-center mt-3">
                            <p className="font-medium">Shivam & Tanmay</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* First Tournament Section */}
                <div className="mb-16 pt-12 border-t-2 border-blue-100">
                  <button
                    type="button"
                    onClick={() => toggleTournament("1st")}
                    aria-expanded={expandedTournament === "1st"}
                    aria-controls="past-season-1st-panel"
                    id="past-season-1st-trigger"
                    className="tournament-button group relative mb-6 flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 p-5 text-left text-white shadow-xl hover:shadow-2xl sm:p-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative z-10 flex min-w-0 flex-1 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30 sm:h-14 sm:w-14">
                        <span className="text-2xl sm:text-3xl">🏸</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">First Tournament Results</h3>
                        <p className="mt-1 hidden text-sm text-white/80 sm:block">Past season — expand to view</p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-white/90 sm:hidden">
                          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                          Expand for photos
                        </p>
                      </div>
                    </div>
                    <div
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/35 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/35 sm:h-12 sm:w-12"
                      aria-hidden
                    >
                      <ChevronDown
                        className={`h-5 w-5 text-white transition-transform duration-300 ease-out sm:h-6 sm:w-6 ${
                          expandedTournament === "1st" ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.5}
                      />
                    </div>
                  </button>

                  {expandedTournament === "1st" && (
                    <div id="past-season-1st-panel" role="region" aria-labelledby="past-season-1st-trigger" className="animate-slide-down">
                      <div className="mt-8 text-center">
                        <img
                          src={allFinalistsImage}
                          alt="All tournament finalists"
                          className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                        />
                        <p className="text-sm text-gray-600 mt-3">
                          First Tournament Finalists
                        </p>
                      </div>

                      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl shadow-sm">
                          <h4 className="font-semibold text-yellow-700 mb-3 text-center">
                            Champions
                          </h4>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="font-medium">Himanshu & Surya</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Gold Trophy Winners
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm">
                          <h4 className="font-semibold text-gray-700 mb-3 text-center">
                            Runners-up
                          </h4>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="font-medium">Abhi & Soumya</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Silver Trophy Winners
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl shadow-sm">
                          <h4 className="font-semibold text-amber-700 mb-3 text-center">
                            Semifinalists
                          </h4>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="font-medium">Mahendran & Shivam</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg text-center mt-3">
                            <p className="font-medium">Ankit & Anurag</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-12 bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">
                    Tournament Officials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-700 mb-3">
                        Referees
                      </h4>
                      <ul className="space-y-2">
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>Amol (co-host)</p>
                        </li>
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>DK (referee)</p>
                        </li>
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>Arijit (referee)</p>
                        </li>
                        <li className="bg-white p-3 rounded-lg flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <p>Abhilash (website-handler)</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-3">
                        Tournament Host
                      </h4>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-medium">Organized by:</p>
                        <p className="mt-1">Anup Badminton Academy</p>
                        <p className="text-sm text-gray-600 mt-3">
                          Led by Tournament Director:
                        </p>
                        <p className="font-medium">Anup Kumar</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <img
                      src={tournamentOfficialsImage}
                      alt="Tournament officials and organizers"
                      className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                    />
                    <p className="text-sm text-gray-600 mt-3">
                      Our dedicated team of referees and organizers
                    </p>
                  </div>

                  <div className="mt-8 text-center">
                    <blockquote className="italic text-gray-700 px-8 relative">
                      <span className="text-4xl text-blue-300 absolute left-0 top-0">
                        "
                      </span>
                      A heartfelt thank you to our incredible hosts for creating
                      this amazing tournament. Your dedication to bringing
                      players together and fostering the spirit of competition
                      has made this event truly special. The smooth organization
                      and warm hospitality have set a new standard for badminton
                      tournaments.
                      <span className="text-4xl text-blue-300 absolute right-0 bottom-0">
                        "
                      </span>
                    </blockquote>
                    <p className="mt-4 font-medium">
                      - On behalf of all participants
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentResults;
