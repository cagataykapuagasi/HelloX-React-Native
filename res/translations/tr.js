export default {
  app: {
    login: 'Giriş',
    register: 'Üye Ol',
    settings: 'Ayarlar',
    change_password: 'Şifre Değiştir',
  },
  login: {
    labels: { username: 'kullanıcı adı', password: 'şifre' },
    button: 'Giriş',
    register: 'Üye Ol',
  },
  register: {
    labels: {
      username: 'kullanıcı adı',
      email: 'E-posta',
      password: 'şifre',
      password_confirmation: 'şifre tekrar',
    },
    button: 'Üye Ol',
    errors: { username: 'Kullanıcı adı zaten alınmış.', email: 'E-posta zaten alınmış.' },
  },
  change_password: {
    labels: {
      password: 'şifre',
      new_password: 'yeni şifre',
      new_password_confirmation: 'yeni şifre tekrar',
    },
    button: 'Değiştir',
  },
  settings: {
    placeholder: 'Kendinle ilgili bir şeyler yaz...',
    line1: 'Şifre değiştir',
    line2: 'Bizi puanla',
    line3: 'İletişim',
    deleteAc: 'Hesabı sil',
  },
  home: {
    empty: 'Kullanıcı bulunamadı.',
  },
  chats: {
    empty: 'Henüz mesaj yok.',
  },
  chat: {
    placeholder: 'Bir mesaj yaz',
    placeholderError: 'Sohbete bağlanılmaya çalışılıyor...',
  },
  tabBar: {
    tab1: 'ANASAYFA',
    tab2: 'SOHBETLER',
    dropdown1: 'Ayarlar',
    dropdown2: 'Çıkış Yap',
  },
  chatBar: {
    dropdown1: 'Sil',
    online: 'Çevrimiçi',
    offline: 'Çevrimdışı',
  },
  searchBar: {
    label: 'Kullanıcıları bul',
    button: 'Rast',
  },
  alerts: {
    settings: {
      delete: {
        title: 'Hesabı sil',
        text: 'Hesabınız silinecek',
        buttons: { yes: 'Evet', no: 'Hayır' },
      },
      photo: 'Bir şeyler yanlış gitti. Fotoğrafınızı yükleyemedik.',
      about: 'Bir şeyler yanlış gitti. Durumunuzu güncelleyemedik.',
    },
    home: 'Bir şeyler yanlış gitti. Kullanıcıları arayamadık.',
    change_password: 'Şifreniz güncellendi.',
    clientMessage:
      'Bir şeyler yanlış gitti. Sunucuya erişemedik, lütfen daha sonra tekrar deneyin.',
    userStore: 'Bir şeyler yanlış gitti. Hesabınızı silemedik.',
    logOut: {
      title: 'Çıkış Yap',
      text: 'Mesajlarınız silinecek',
      buttons: { yes: 'Evet', no: 'Hayır' },
    },
  },
};
