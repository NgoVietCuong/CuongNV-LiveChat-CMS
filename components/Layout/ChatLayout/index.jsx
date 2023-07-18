import ChatNav from './ChatNav';

export default function ChatLayout({ children, jwt }) {
  return (
    <>
      <ChatNav jwt={jwt} />
      {children}
    </>
  )
}