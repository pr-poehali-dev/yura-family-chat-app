import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "chats" | "contacts" | "video" | "gallery" | "notifications" | "profile";

const contacts = [
  { id: 1, name: "Мама", status: "online", avatar: "👩", lastSeen: "сейчас онлайн", phone: "+7 900 123-45-67" },
  { id: 2, name: "Папа", status: "offline", avatar: "👨", lastSeen: "был 30 мин назад", phone: "+7 900 765-43-21" },
  { id: 3, name: "Сестра Катя", status: "online", avatar: "👧", lastSeen: "сейчас онлайн", phone: "+7 911 222-33-44" },
  { id: 4, name: "Брат Миша", status: "offline", avatar: "👦", lastSeen: "был вчера", phone: "+7 922 555-66-77" },
  { id: 5, name: "Бабушка", status: "online", avatar: "👵", lastSeen: "сейчас онлайн", phone: "+7 933 888-99-00" },
];

const chats = [
  { id: 1, name: "Мама", avatar: "👩", lastMsg: "Как дела, сынок? Приедешь в воскресенье?", time: "14:32", unread: 2, isVoice: false, online: true },
  { id: 2, name: "Семейный чат 🏡", avatar: "🏠", lastMsg: "🎤 Голосовое сообщение · 0:43", time: "13:10", unread: 5, isVoice: true, online: false },
  { id: 3, name: "Папа", avatar: "👨", lastMsg: "Ок, понял. До встречи!", time: "Вчера", unread: 0, isVoice: false, online: false },
  { id: 4, name: "Сестра Катя", avatar: "👧", lastMsg: "🎤 Голосовое сообщение · 1:12", time: "Вчера", unread: 1, isVoice: true, online: true },
  { id: 5, name: "Бабушка", avatar: "👵", lastMsg: "Пирожки уже готовы 🥧", time: "Пн", unread: 0, isVoice: false, online: true },
];

const messages = [
  { id: 1, from: "Мама", avatar: "👩", text: "Привет! Как ты?", time: "14:10", mine: false, type: "text", duration: undefined },
  { id: 2, from: "Я", avatar: "🙋", text: "Всё хорошо, мама! Работаю", time: "14:12", mine: true, type: "text", duration: undefined },
  { id: 3, from: "Мама", avatar: "👩", text: "", time: "14:20", mine: false, type: "voice", duration: "0:38" },
  { id: 4, from: "Я", avatar: "🙋", text: "Понял, приеду в воскресенье 🙂", time: "14:30", mine: true, type: "text", duration: undefined },
  { id: 5, from: "Мама", avatar: "👩", text: "Как дела, сынок? Приедешь в воскресенье?", time: "14:32", mine: false, type: "text", duration: undefined },
];

const gallery = [
  { id: 1, emoji: "🌅", label: "Рассвет на даче", date: "22 марта" },
  { id: 2, emoji: "🎂", label: "День рождения папы", date: "20 марта" },
  { id: 3, emoji: "🏡", label: "Дома у бабушки", date: "15 марта" },
  { id: 4, emoji: "🌿", label: "Прогулка в лесу", date: "10 марта" },
  { id: 5, emoji: "🍝", label: "Семейный ужин", date: "5 марта" },
  { id: 6, emoji: "❄️", label: "Зимние каникулы", date: "15 янв" },
];

const notificationsData = [
  { id: 1, icon: "🎤", text: "Мама отправила голосовое сообщение", time: "5 мин назад", read: false },
  { id: 2, icon: "📸", text: "Катя добавила 3 фото в галерею", time: "1 час назад", read: false },
  { id: 3, icon: "📞", text: "Пропущенный видеозвонок от Папы", time: "2 часа назад", read: false },
  { id: 4, icon: "💬", text: "Миша написал в Семейный чат", time: "Вчера", read: true },
  { id: 5, icon: "👵", text: "Бабушка онлайн", time: "Вчера", read: true },
];

function VoiceMessage({ duration, mine }: { duration: string; mine: boolean }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl min-w-[180px] ${mine ? "bg-purple-600/30" : "bg-white/8"}`}>
      <button
        onClick={() => setPlaying(!playing)}
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${playing ? "bg-pink-500" : "bg-purple-500"}`}
      >
        <Icon name={playing ? "Pause" : "Play"} size={16} className="text-white" />
      </button>
      <div className="flex items-center gap-[3px] flex-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`w-[3px] rounded-full transition-all ${playing ? "waveform-bar bg-purple-400" : "bg-white/30"}`}
            style={{ height: playing ? undefined : `${[6, 14, 10, 18, 8, 16, 6][i]}px` }}
          />
        ))}
      </div>
      <span className="text-xs text-white/50 flex-shrink-0">{duration}</span>
    </div>
  );
}

function ChatsTab() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState(false);

  if (activeChat !== null) {
    const chat = chats.find((c) => c.id === activeChat)!;
    return (
      <div className="flex flex-col h-full animate-fade-in">
        <div className="glass border-b border-white/8 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setActiveChat(null)} className="text-white/60 hover:text-white transition-colors">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <span className="text-2xl">{chat.avatar}</span>
          <div>
            <p className="font-semibold text-white text-sm">{chat.name}</p>
            <p className="text-xs text-purple-400">{chat.online ? "онлайн" : "был недавно"}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-105">
              <Icon name="Video" size={18} />
            </button>
            <button className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-105">
              <Icon name="Phone" size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.mine ? "flex-row-reverse" : "flex-row"} animate-slide-up`}>
              <span className="text-xl flex-shrink-0 self-end">{msg.avatar}</span>
              <div className={`max-w-[72%] ${msg.mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {msg.type === "voice" ? (
                  <VoiceMessage duration={msg.duration!} mine={msg.mine} />
                ) : (
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.mine ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-sm" : "bg-white/8 text-white rounded-bl-sm"}`}>
                    {msg.text}
                  </div>
                )}
                <span className="text-[10px] text-white/30 px-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="glass border-t border-white/8 p-3 flex items-center gap-2">
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-purple-400 transition-all">
            <Icon name="Paperclip" size={18} />
          </button>
          <div className="flex-1 glass rounded-full px-4 py-2.5 flex items-center">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Написать..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
          <button
            onMouseDown={() => setRecording(true)}
            onMouseUp={() => setRecording(false)}
            onMouseLeave={() => setRecording(false)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${recording ? "bg-red-500 scale-110" : "bg-gradient-to-br from-purple-600 to-pink-600"}`}
          >
            <Icon name={inputText ? "Send" : "Mic"} size={18} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-2 pb-3">
        <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2">
          <Icon name="Search" size={16} className="text-white/40" />
          <input placeholder="Поиск чатов..." className="bg-transparent text-sm text-white placeholder-white/30 outline-none flex-1" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 flex flex-col gap-1">
        {chats.map((chat, i) => (
          <button
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all text-left animate-fade-in group"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-white/10 flex items-center justify-center text-xl">
                {chat.avatar}
              </div>
              {chat.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[hsl(240,15%,7%)]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm text-white truncate">{chat.name}</p>
                <span className="text-[11px] text-white/30 flex-shrink-0 ml-2">{chat.time}</span>
              </div>
              <p className={`text-xs mt-0.5 truncate ${chat.isVoice ? "text-purple-400" : "text-white/40"}`}>{chat.lastMsg}</p>
            </div>
            {chat.unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {chat.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactsTab() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-2 pb-3">
        <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2">
          <Icon name="Search" size={16} className="text-white/40" />
          <input placeholder="Поиск контактов..." className="bg-transparent text-sm text-white placeholder-white/30 outline-none flex-1" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 flex flex-col gap-2">
        {contacts.map((c, i) => (
          <div key={c.id} className="flex items-center gap-3 p-3 glass rounded-2xl animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center text-xl">
                {c.avatar}
              </div>
              {c.status === "online" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[hsl(240,15%,7%)]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-white">{c.name}</p>
              <p className={`text-xs mt-0.5 ${c.status === "online" ? "text-emerald-400" : "text-white/35"}`}>{c.lastSeen}</p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/60 hover:text-purple-400 transition-all hover:scale-105">
                <Icon name="MessageCircle" size={16} />
              </button>
              <button className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/60 hover:text-pink-400 transition-all hover:scale-105">
                <Icon name="Video" size={16} />
              </button>
            </div>
          </div>
        ))}
        <button className="flex items-center gap-3 p-3 border-2 border-dashed border-white/10 rounded-2xl text-white/30 hover:text-purple-400 hover:border-purple-500/40 transition-all mt-1">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center">
            <Icon name="Plus" size={18} />
          </div>
          <span className="text-sm font-medium">Добавить родственника</span>
        </button>
      </div>
    </div>
  );
}

function VideoTab() {
  const [calling, setCalling] = useState(false);
  return (
    <div className="flex flex-col h-full px-4 py-4 gap-4 overflow-y-auto scrollbar-hide">
      {calling ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-fade-in min-h-[400px]">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-5xl neon-glow-purple">
            👩
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">Мама</p>
            <p className="text-sm text-purple-400 mt-1 animate-pulse-soft">Вызов...</p>
          </div>
          <button
            onClick={() => setCalling(false)}
            className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-all hover:scale-105 neon-glow-pink"
          >
            <Icon name="PhoneOff" size={24} className="text-white" />
          </button>
        </div>
      ) : (
        <>
          <div className="glass rounded-3xl p-5 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-500/30 flex items-center justify-center text-4xl">
              📹
            </div>
            <p className="text-lg font-bold text-white">Видеозвонок</p>
            <p className="text-sm text-white/40 text-center">Позвоните родным прямо сейчас — лицом к лицу</p>
            <button
              onClick={() => setCalling(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105 neon-glow-purple"
            >
              Начать звонок
            </button>
          </div>

          <p className="text-xs text-white/30 font-medium px-1">Быстрый набор</p>
          {contacts.filter((c) => c.status === "online").map((c, i) => (
            <div key={c.id} className="flex items-center gap-3 glass rounded-2xl p-3 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center text-xl">
                  {c.avatar}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[hsl(240,15%,7%)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <p className="text-xs text-emerald-400">онлайн</p>
              </div>
              <button onClick={() => setCalling(true)} className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <Icon name="Video" size={16} className="text-white" />
              </button>
            </div>
          ))}

          <div className="glass rounded-2xl p-4">
            <p className="text-xs text-white/30 font-medium mb-3">Пропущенные</p>
            <div className="flex items-center gap-3">
              <span className="text-xl">👨</span>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">Папа</p>
                <p className="text-xs text-red-400">Сегодня 11:42</p>
              </div>
              <button onClick={() => setCalling(true)} className="px-3 py-1.5 glass rounded-xl text-xs text-purple-400 hover:text-white transition-all border border-purple-500/30">
                Перезвонить
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function GalleryTab() {
  return (
    <div className="flex flex-col h-full px-4 py-2">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-white/30 font-medium">Семейный альбом · {gallery.length} фото</p>
        <button className="text-xs text-purple-400 font-medium hover:text-purple-300 transition-colors">+ Добавить</button>
      </div>
      <div className="grid grid-cols-2 gap-3 overflow-y-auto scrollbar-hide pb-2">
        {gallery.map((item, i) => (
          <div
            key={item.id}
            className="glass rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-all animate-fade-in group"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-4xl group-hover:scale-110 transition-transform">{item.emoji}</span>
            <p className="text-xs text-white/60 font-medium px-2 text-center">{item.label}</p>
            <p className="text-[10px] text-white/25">{item.date}</p>
          </div>
        ))}
        <div className="border-2 border-dashed border-white/10 rounded-2xl aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-purple-500/40 transition-all group">
          <Icon name="Plus" size={24} className="text-white/20 group-hover:text-purple-400 transition-colors" />
          <p className="text-xs text-white/20 group-hover:text-purple-400 transition-colors">Добавить фото</p>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [notifs, setNotifs] = useState(notificationsData);
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-2 pb-3 flex items-center justify-between">
        <p className="text-sm text-white/50">
          {unreadCount > 0 ? <span className="text-purple-400 font-semibold">{unreadCount} новых</span> : "Всё прочитано"}
        </p>
        {unreadCount > 0 && (
          <button onClick={() => setNotifs(notifs.map((n) => ({ ...n, read: true })))} className="text-xs text-white/40 hover:text-purple-400 transition-colors">
            Прочитать все
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 flex flex-col gap-2">
        {notifs.map((n, i) => (
          <div
            key={n.id}
            onClick={() => setNotifs(notifs.map((x) => x.id === n.id ? { ...x, read: true } : x))}
            className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all animate-fade-in ${n.read ? "bg-white/3" : "glass border border-purple-500/20"}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-2xl flex-shrink-0">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug ${n.read ? "text-white/50" : "text-white"}`}>{n.text}</p>
              <p className="text-xs text-white/25 mt-0.5">{n.time}</p>
            </div>
            {!n.read && <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="flex flex-col h-full px-4 py-4 gap-4 overflow-y-auto scrollbar-hide">
      <div className="glass rounded-3xl p-5 flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-4xl neon-glow-purple">
            🙋
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-[hsl(240,15%,7%)]">
            <Icon name="Camera" size={12} className="text-white" />
          </button>
        </div>
        <div className="text-center">
          <p className="font-bold text-white text-lg">Алексей Смирнов</p>
          <p className="font-caveat text-purple-400 text-base mt-0.5">Всегда рядом ❤️</p>
        </div>
        <button className="px-5 py-2 glass border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:border-purple-500/40 transition-all">
          Редактировать профиль
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        {[
          { icon: "Bell", label: "Уведомления", value: "Включены" },
          { icon: "Mic", label: "Голосовые записи", value: "Авто-сохранение" },
          { icon: "Image", label: "Качество фото", value: "Высокое" },
          { icon: "Lock", label: "Конфиденциальность", value: "Семья" },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < 3 ? "border-b border-white/5" : ""}`}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
              <Icon name={item.icon as "Bell" | "Mic" | "Image" | "Lock"} size={15} className="text-purple-400" />
            </div>
            <p className="flex-1 text-sm text-white">{item.label}</p>
            <p className="text-xs text-white/35">{item.value}</p>
            <Icon name="ChevronRight" size={14} className="text-white/20" />
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-white/30 mb-3 font-medium">Сохранённые голосовые</p>
        <div className="flex flex-col gap-2">
          {[
            { name: "Мама", duration: "0:38", date: "Сегодня" },
            { name: "Семейный чат", duration: "1:12", date: "Вчера" },
          ].map((v, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/3 rounded-xl px-3 py-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Icon name="Mic" size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{v.name}</p>
                <p className="text-xs text-white/30">{v.date} · {v.duration}</p>
              </div>
              <button className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/40 transition-all">
                <Icon name="Play" size={12} className="text-purple-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const navItems: { id: Tab; label: string; icon: string }[] = [
  { id: "chats", label: "Чаты", icon: "MessageCircle" },
  { id: "contacts", label: "Контакты", icon: "Users" },
  { id: "video", label: "Видео", icon: "Video" },
  { id: "gallery", label: "Галерея", icon: "Image" },
  { id: "notifications", label: "Оповещения", icon: "Bell" },
  { id: "profile", label: "Профиль", icon: "User" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const unreadNotifs = notificationsData.filter((n) => !n.read).length;

  const renderTab = () => {
    switch (activeTab) {
      case "chats": return <ChatsTab />;
      case "contacts": return <ContactsTab />;
      case "video": return <VideoTab />;
      case "gallery": return <GalleryTab />;
      case "notifications": return <NotificationsTab />;
      case "profile": return <ProfileTab />;
    }
  };

  const tabTitles: Record<Tab, string> = {
    chats: "Чаты",
    contacts: "Контакты",
    video: "Видеозвонки",
    gallery: "Галерея",
    notifications: "Уведомления",
    profile: "Мой профиль",
  };

  return (
    <div className="bg-mesh h-screen flex flex-col max-w-sm mx-auto relative overflow-hidden">
      <div className="glass border-b border-white/8 px-5 pt-10 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{tabTitles[activeTab]}</h1>
          <div className="flex items-center gap-1">
            <span className="font-caveat text-sm text-purple-400">Семья</span>
            <span className="text-base">❤️</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {renderTab()}
      </div>

      <div className="glass-dark border-t border-white/8 flex-shrink-0">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all relative ${isActive ? "text-white" : "text-white/35 hover:text-white/60"}`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/25 to-pink-600/20" />
                )}
                <span className={`relative transition-transform ${isActive ? "scale-110" : ""}`}>
                  <Icon
                    name={item.icon as "MessageCircle" | "Users" | "Video" | "Image" | "Bell" | "User"}
                    size={20}
                    className={isActive ? "text-purple-400" : "text-white/35"}
                  />
                  {item.id === "notifications" && unreadNotifs > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-pink-500 rounded-full text-[8px] text-white font-bold flex items-center justify-center">
                      {unreadNotifs}
                    </span>
                  )}
                </span>
                <span className={`text-[9px] font-medium relative transition-all ${isActive ? "text-purple-300" : "text-white/25"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
