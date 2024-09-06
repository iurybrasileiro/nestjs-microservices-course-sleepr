describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'iury.brasileiro@outlook.com',
      password: 'Password@1234',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/auth.login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    jwt = await response.text();
    console.log(jwt);
  });

  test('Create & Get', async () => {
    const createdReservation = await createReservation();

    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
      },
    );
    const reservation = await responseGet.json();

    expect(createdReservation).toEqual(reservation);
  });

  const createReservation = async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
        body: JSON.stringify({
          startDate: '10-10-2024',
          endDate: '10-15-2024',
          placeId: '123',
          charge: {
            amount: 15,
            card: {
              cvc: 123,
              exp_month: 12,
              exp_year: 2030,
              number: '4242 4242 4242 4242',
            },
          },
        }),
      },
    );

    expect(responseCreate.ok).toBeTruthy();
    return responseCreate.json();
  };
});
