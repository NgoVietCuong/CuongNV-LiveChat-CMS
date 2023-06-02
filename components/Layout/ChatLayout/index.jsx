import ChatNav from './ChatNav';

export default function ChatLayout({ children }) {
  const users = [
    {id: '368d5ec0-ae4d-43b2-bb33-35df7d33a320', name: 'Nguyen Hoa', email: 'nguyenhoa@gmail.com', message: 'I\'m so cute', time: '9:35 PM' },
    {id: 'decd2998-fbc3-477b-b394-5c822812d96c', name: 'Ngo Cuong', email: 'ngocuong@gmail.com', message: 'Wild flower', time: '11:40 PM' },
    {id: 'decd2998-fbc3-477b-b394-5c822812d96d', name: 'Duc Dat', email: 'ducdat@gmail.com', message: 'Wild flower', time: '11:40 AM' },
    {id: 'decd2998-fbc3-477b-b394-5c822812d96e', name: 'The Anh', email: 'theanh@gmail.com', message: 'Wild flower', time: '11:40 AM' },
    {id: 'decd2998-fbc3-477b-b394-5c822812d96f', name: 'Hai Nam', email: 'hainam@gmail.com', message: 'Wild flower', time: '11:40 PM' },
    // {id: 'decd2998-fbc3-477b-b394-5c822812d96g', name: 'Duc Tung', message: 'Wild flower', time: '11:40' },
    // {id: 'decd2998-fbc3-477b-b394-5c822812d96h', name: 'Thi Trang', message: 'Wild flower', time: '11:40' },
    // {id: 'decd2998-fbc3-477b-b394-5c822812d96i', name: 'Ngo Cuong', message: 'Wild flower', time: '11:40' },
    // {id: 'decd2998-fbc3-477b-b394-5c822812d96k', name: 'Ngo Cuong', message: 'Wild flower', time: '11:40' },
    // {id: 'decd2998-fbc3-477b-b394-5c822812d96l', name: 'Ngo Cuong', message: 'Wild flower', time: '11:40' },
    // {id: 'decd2998-fbc3-477b-b394-5c822812d96m', name: 'Ngo Cuong', message: 'Wild flower', time: '11:40' }
  ];

  return (
    <>
      <ChatNav users={users} />
      {children}
    </>
  )
}