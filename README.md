VK TABLE TEST

Приложение содержит:

1. Таблицу, которая может содержать произвольное кол-во полей (для приложения принято - 5 полей).
2. Данные в таблицу загружаются с сервера, для подгрузки новых данных методом Infinite Loader используется Infinite Query из библиотеки React Query.
3. Т.к. React Query целесообразно использовать для хранения, кэширования и актуализации данных с сервера, то было принято решение не использовать дополнительные стейт-менеджеры в условиях отсутствия хранения данных клиента (пагинация, фильтры и др.).
4. Форма создания новой записи в таблице сожержит 5 полей. 
5. Форма отправляется по API. Запись добавляется в таблицу.

Тесты не писал по причине того, что многие библиотеки (к примеру для тестирования hook'ов  - @testing-library/react-hooks и react-test-renderer), на данный момент, либо плохо, либо не поддерживают совсем 19 версию React.