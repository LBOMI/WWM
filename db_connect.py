import mysql.connector

# MySQL 데이터베이스에 연결
def connect_to_database():
    connection = mysql.connector.connect(
        host='localhost:3306',  # MySQL 서버의 주소
        user='root',  # MySQL 사용자 이름
        password='1234',  # MySQL 사용자 비밀번호
        database='wwmD B'  # 사용할 데이터베이스 이름
    )
    return connection

# 경로 데이터를 데이터베이스에 저장하는 함수
def save_path_to_database(start, end, tags):
    connection = connect_to_database()
    cursor = connection.cursor()

    # 데이터 삽입 SQL 문
    sql = "INSERT INTO paths (start_location, end_location, tags) VALUES (%s, %s, %s)"
    values = (start, end, tags)

    cursor.execute(sql, values)
    connection.commit()

    print(f"경로 데이터가 성공적으로 저장되었습니다. ID: {cursor.lastrowid}")

    cursor.close()
    connection.close()

# 예제 실행
save_path_to_database('출발지 예제', '도착지 예제', '#산책 #하이킹')
