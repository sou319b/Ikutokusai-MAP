"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const areas = [
  { 
    id: "①", 
    name: "K3号館", 
    coords: [0.25, 0.36, 0.35, 0.50], 
    info: [
      {
        floor: "3階",
        rooms: [
          { number: "3301", name: "プログラミング実習室" },
          { number: "3303", name: "デザイン工房" }
        ]
      },
      {
        floor: "4階",
        rooms: [
          { number: "3401", name: "AI研究ラボ" },
          { number: "3403", name: "ロボティクス実験室" }
        ]
      }
    ],
    description: `K3号館は、最新のテクノロジーを学ぶための施設です。
プログラミングやAI、ロボティクスなど、先端技術の教育と研究が行われています。`
  },
  { 
    id: "②", 
    name: "図書館", 
    coords: [0.15, 0.40, 0.225, 0.52], 
    info: [
      {
        floor: "1階",
        rooms: [
          { number: "101", name: "一般図書エリア" },
          { number: "102", name: "閲覧室" }
        ]
      },
      {
        floor: "2階",
        rooms: [
          { number: "201", name: "専門書エリア" },
          { number: "202", name: "グループ学習室" }
        ]
      }
    ],
    description: `図書館は24時間開館しており、豊富な蔵書と快適な学習環境を提供しています。
一般図書から専門書まで幅広い分野の本を取り揃えています。`
  },
  { 
    id: "③", 
    name: "体育館", 
    coords: [0.375, 0.30, 0.475, 0.42], 
    info: [
      {
        floor: "1階",
        rooms: [
          { number: "メインアリーナ", name: "バスケットボールコート" },
          { number: "サブアリーナ", name: "卓球場" }
        ]
      },
      {
        floor: "2階",
        rooms: [
          { number: "201", name: "フィットネスルーム" },
          { number: "202", name: "ダンススタジオ" }
        ]
      }
    ],
    description: `体育館は様々なスポーツ活動に対応した多目的施設です。
メインアリーナでの大会開催や、各種運動部の練習に利用されています。`
  },
  { 
    id: "④", 
    name: "学生会館", 
    coords: [0.50, 0.10, 0.6875, 0.30], 
    info: [
      {
        floor: "1階",
        rooms: [
          { number: "101", name: "学生ラウンジ" },
          { number: "102", name: "カフェテリア" }
        ]
      },
      {
        floor: "2階",
        rooms: [
          { number: "201", name: "サークル活動室" },
          { number: "202", name: "多目的ホール" }
        ]
      }
    ],
    description: `学生会館は学生生活の中心となる施設です。
休憩やグループワーク、サークル活動など、様々な用途に利用されています。`
  },
]

export default function InteractiveCampusMap() {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [selectedArea, setSelectedArea] = useState(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const updateImageSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight
        })
      }
    }

    window.addEventListener('resize', updateImageSize)
    updateImageSize()

    return () => window.removeEventListener('resize', updateImageSize)
  }, [])

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">インタラクティブ学園祭マップ</h1>
      <div className="relative inline-block rounded-lg overflow-hidden shadow-xl w-full">
        <img 
          ref={imageRef}
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/facility_map-ccL63FThoLb2qr0S9oq4rLh9NaN5hU.jpg" 
          alt="学園祭マップ" 
          className="w-full h-auto"
        />
        <svg className="absolute top-0 left-0 w-full h-full" aria-hidden="true">
          {areas.map((area) => (
            <g key={area.id} className="cursor-pointer" onClick={() => setSelectedArea(area)}>
              <circle
                cx={`${(area.coords[0] + area.coords[2]) / 2 * 100}%`}
                cy={`${(area.coords[1] + area.coords[3]) / 2 * 100}%`}
                r="18"
                fill="rgba(59, 130, 246, 0.8)"
                className="transition-all duration-200 hover:fill-opacity-100"
              />
              <text
                x={`${(area.coords[0] + area.coords[2]) / 2 * 100}%`}
                y={`${(area.coords[1] + area.coords[3]) / 2 * 100}%`}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="24"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {area.id}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {selectedArea && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">{selectedArea.id} {selectedArea.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <p className="mb-4 text-gray-700">{selectedArea.description}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>階</TableHead>
                    <TableHead>部屋番号</TableHead>
                    <TableHead>名称</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedArea.info.flatMap((floor) =>
                    floor.rooms.map((room, index) => (
                      <TableRow key={`${floor.floor}-${room.number}`}>
                        {index === 0 && (
                          <TableCell rowSpan={floor.rooms.length} className="font-medium">
                            {floor.floor}
                          </TableCell>
                        )}
                        <TableCell>{room.number}</TableCell>
                        <TableCell>{room.name}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-2xl">施設一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((area) => (
              <li key={area.id} className="flex items-center space-x-2">
                <span className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {area.id}
                </span>
                <span className="text-gray-700">{area.name}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}